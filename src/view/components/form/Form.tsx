import React from 'react';
import classNames from 'classnames';
import { hasChildrenFunc, hasRenderFunc } from '../../../utils';

type API<T> = ReturnType<FormLayout<T>['getApi']>;

type RenderProps<T> = { children: (api: API<T>) => React.ReactNode } | { render: (api: API<T>) => React.ReactNode };

type Props<T> = {
  className?: string;
  initialFormData: T;
  onSubmit?: (props: { data: T; setSubmitting: (submitting?: boolean) => void; resetForm: (data?: Partial<T>) => void; }) => void;
  onValidation?: (name: string, value: any, values: T) => Promise<string | void>;
} & RenderProps<T>;

type FormErrors<T> = { [key in keyof T]: string };

interface State<T> {
  submitting: boolean;
  form: {
    data: T;
    errors: FormErrors<T>;
  }
}

const parseInput = <T extends {}>(e: React.ChangeEvent<HTMLInputElement>): { name: keyof T, value: any } => {
  const { target } = e;

  const name = target.name as keyof T;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  return {name, value};
};

const setFormState = <T extends {}>(data: Partial<T>, errors = {} as FormErrors<T>) => ({ form }: State<T>) => ({
  form: {
    data: { ...form.data, ...data },
    errors: { ...form.errors, ...errors }
  }
})

class FormLayout<T> extends React.Component<Props<T>, State<T>> {
  readonly state: State<T> = {
    submitting: false,
    form: {
      data: this.props.initialFormData,
      errors: {} as FormErrors<T>
    }
  };

  ['getApi'] = () => {
    const { form, submitting } = this.state;
    return {
      data: form.data,
      errors: form.errors,
      submitting,
      handleInputChange: this.handleInputChange,
      handleInputBlur: this.handleInputBlur,
    };
  };

  ['handleInputChange'] = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = parseInput<T>(e);
    this.setState(setFormState(
      { [name]: value } as Partial<T>,
      { [name]: '' } as FormErrors<T>
    ));
  }

  ['handleInputBlur'] = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = parseInput(e);

    const { onValidation = () => Promise.resolve({}) } = this.props;

    onValidation(name, value, this.state.form.data).catch(err => this.setState(setFormState(
      {},
      { [name]: err.message || err } as FormErrors<T>
    )));
  }

  ['handleSubmit'] = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { onSubmit = () => {} } = this.props;
    onSubmit({ data: this.state.form.data, setSubmitting: this.setSubmitting, resetForm: this.resetForm });
  }

  ['resetForm'] = (newData?: Partial<T>, errors = {} as FormErrors<T>) => this.setState(setFormState(newData || this.props.initialFormData, errors));

  ['setSubmitting'] = (submitting?: boolean) => this.setState(() => ({ submitting: !!submitting }));

  render() {
    const { className } = this.props;
    return (
      <form className={classNames('form', className)} onSubmit={this.handleSubmit}>
        {this.renderChildren()}
      </form>
    );
  }

  ['renderChildren'] = () => {
    if (hasChildrenFunc(this.props)) {
      return this.props.children(this.getApi());
    }
    if (hasRenderFunc(this.props)) {
      return this.props.render(this.getApi());
    }
    throw new Error('form requires one of the following props: children, render');
  }
}

export default FormLayout;
