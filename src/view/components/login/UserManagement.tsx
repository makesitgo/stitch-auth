import React from 'react';

interface Props {
  handleResendConfirmationEmail: () => void;
  handleSendResetPasswordEmail: () => void;
}

class UserManagement extends React.Component<Props> {
  render() {
    const { handleResendConfirmationEmail, handleSendResetPasswordEmail } = this.props;
    return (
      <div className="login-form">
        <button onClick={handleResendConfirmationEmail}>resend confirmation email</button>
        <button onClick={handleSendResetPasswordEmail}>send reset password email</button>
      </div>
    );
  }
}

export default UserManagement;
