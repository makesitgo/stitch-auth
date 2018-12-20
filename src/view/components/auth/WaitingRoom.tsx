import React from 'react';

interface Props {
  emailTopic: 'confirmation' | 'password_reset';
}

const CONFIRMATION_EMAIL = 'confirmation';
const PASSWORD_RESET_EMAIL = 'password_reset';

const STITCH_EMAIL_ADDRESS = 'no-reply+stitch@mongodb.com';

const emailDisplay = (email: string) => {
  switch (email) {
    case CONFIRMATION_EMAIL:
      return 'a confirmation email';
    case PASSWORD_RESET_EMAIL:
      return 'a password reset email';
  }
  return 'an email';
};

class WaitingRoom extends React.Component<Props> {
  render() {
    const { emailTopic } = this.props;
    return (
      <div className="waiting-room">
        <h1>waiting room</h1>
        <p>
          {`${emailDisplay(emailTopic)} has been sent to your inbox by `}
          <span>{STITCH_EMAIL_ADDRESS}</span>
          {`. you must click the link provided in that email to proceed. you can close this window if you wish.`}
        </p>
      </div>
    );
  }
}

export default WaitingRoom;
