import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { urls } from '../../utils';
import { resendConfirmationEmail } from '../../state';
import { ConfirmationEmailForm } from '../components';

interface DispatchProps {
  resendConfirmationEmail: (email: string) => Promise<void>;
  gotoWaitingRoom: () => void;
}

type Props = DispatchProps;

class ConfirmationEmail extends React.Component<Props> {
  ['resendConfirmationEmail'] = ({ email }: { email: string }) => this.props.resendConfirmationEmail(email);

  render() {
    const { gotoWaitingRoom } = this.props;
    return (
      <div className="confirmation-email">
        <h1>confirmation email</h1>
        <ConfirmationEmailForm handleSubmit={this.resendConfirmationEmail} gotoWaitingRoom={gotoWaitingRoom} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resendConfirmationEmail: (email: string) => dispatch<any>(resendConfirmationEmail.action(email)),
  gotoWaitingRoom: () => dispatch(push(urls.waitingRoom().confirmationEmail())),
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(ConfirmationEmail);
