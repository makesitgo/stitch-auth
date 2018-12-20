import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  error?: string;
  children: React.ReactElement<any>;
}

class FormInputControl extends React.Component<Props> {
  render() {
    const { children: child, className, error } = this.props;
    return React.cloneElement(child, {
      className: classNames('form-input-control', className, { 'form-input-error': error }),
    });
  }
}

export default FormInputControl;
