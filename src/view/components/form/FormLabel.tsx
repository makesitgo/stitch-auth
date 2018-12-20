import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

class FormLabel extends React.Component<Props> {
  render() {
    const { children, className } = this.props;
    return <div className={classNames('form-label', className)}>{children}</div>;
  }
}

export default FormLabel;
