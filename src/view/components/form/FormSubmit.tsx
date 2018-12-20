import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  children: React.ReactElement<any>;
}

class FormSubmit extends React.Component<Props> {
  render() {
    const { children: child, className } = this.props;
    return React.cloneElement(child, { className: classNames('form-submit', className) });
  }
}

export default FormSubmit;
