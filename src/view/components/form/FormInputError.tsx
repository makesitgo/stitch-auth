import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  error?: string;
  children?: never;
}

class FormInputError extends React.Component<Props> {
  render() {
    const { className, error } = this.props;
    if (!error) {
      return null;
    }
    return <p className={classNames('form-input-error-message', className)}>{error}</p>;
  }
}

export default FormInputError;
