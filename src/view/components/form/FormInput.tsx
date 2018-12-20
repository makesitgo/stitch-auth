import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

class FormInput extends React.Component<Props> {
  render() {
    const { children, className } = this.props;
    return <div className={classNames('form-input', className)}>{children}</div>;
  }
}

export default FormInput;
