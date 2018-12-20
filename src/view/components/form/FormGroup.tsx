import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

class FormGroup extends React.Component<Props> {
  render() {
    const { children, className } = this.props;
    return <div className={classNames('form-group', className)}>{children}</div>;
  }
}

export default FormGroup;
