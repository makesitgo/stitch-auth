import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { urls } from '../../utils';
import { AppState, sendResetPasswordEmail } from '../../state';
import { PasswordResetEmailForm } from '../components';

interface StateProps {
  defaultEmail: string;
}

interface DispatchProps {
  sendResetPasswordEmail: (email: string) => Promise<void>;
  gotoWaitingRoom: () => void;
}

type Props = StateProps & DispatchProps;

class PasswordResetEmail extends React.Component<Props> {
  ['sendResetPasswordEmail'] = ({ email }: { email: string }) => this.props.sendResetPasswordEmail(email);

  render() {
    const { defaultEmail, gotoWaitingRoom } = this.props;
    return (
      <div className="password-reset-email">
        <h1>password reset email</h1>
        <PasswordResetEmailForm defaultEmail={defaultEmail} handleSubmit={this.sendResetPasswordEmail} gotoWaitingRoom={gotoWaitingRoom} />
      </div>
    );
  }
}

const mapStateToProps = ({ session: { user } }: AppState) => ({
  defaultEmail: user && user.profile.email || ''
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendResetPasswordEmail: (email: string) => dispatch<any>(sendResetPasswordEmail.action(email)),
  gotoWaitingRoom: () => dispatch(push(urls.waitingRoom().passwordResetEmail())),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetEmail);
