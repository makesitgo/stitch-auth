import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  children: React.ReactElement<any>;
}

class FormLabelTitle extends React.Component<Props> {
  render() {
    const { children: child, className } = this.props;
    return React.cloneElement(child, { className: classNames('form-label-title', className) });
  }
}

export default FormLabelTitle;
