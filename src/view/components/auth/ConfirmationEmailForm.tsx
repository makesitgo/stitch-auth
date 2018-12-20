import React from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormLabelTitle,
  FormInput,
  FormInputControl,
  FormInputError,
  FormSubmit,
} from '../';
import * as yup from 'yup';

interface Props {
  handleSubmit: (data: typeof initialFormData) => Promise<void>;
  gotoWaitingRoom: () => void;
}

const initialFormData = { email: '' };

const handleValidation = (name: string, value: string) => {
  switch (name) {
    case 'email':
      return yup
        .string()
        .email('must specify a valid email')
        .required('must specify an email')
        .validate(value);
  }
  return Promise.resolve();
};

class ConfirmationEmailForm extends React.Component<Props> {
  render() {
    const { handleSubmit, gotoWaitingRoom } = this.props;
    return (
      <Form
        initialFormData={initialFormData}
        onValidation={handleValidation}
        onSubmit={({ data, setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(data)
            .then(gotoWaitingRoom)
            .catch(() => setSubmitting());
        }}
      >
        {({ data, errors, submitting, handleInputChange, handleInputBlur }) => (
          <>
            <FormGroup>
              <FormLabel>
                <FormLabelTitle>
                  <label htmlFor="confirmation-email-email">email</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.email}>
                  <input
                    id="confirmation-email-email"
                    type="email"
                    name="email"
                    placeholder="liam@gmail.com"
                    value={data.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                </FormInputControl>
                <FormInputError error={errors.email} />
              </FormInput>
            </FormGroup>
            <FormSubmit>
              <button type="submit" disabled={submitting || data.email === '' || errors.email !== ''}>
                submit
              </button>
            </FormSubmit>
          </>
        )}
      </Form>
    );
  }
}

export default ConfirmationEmailForm;
