import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { urls } from '../../utils';
import { AppState, SessionState, EmailPassword, registerWithEmail } from '../../state';
import { RegisterForm } from '../components';

interface StateProps {
  session: SessionState;
}

interface DispatchProps {
  registerWithEmail: (creds: EmailPassword) => Promise<void>;
  gotoWaitingRoom: () => void;
  gotoLogin: () => void;
}

type Props = StateProps & DispatchProps;

class Register extends React.Component<Props> {
  ['register'] = (creds: EmailPassword) => this.props.registerWithEmail(creds);

  render() {
    const { gotoWaitingRoom, gotoLogin } = this.props;
    return (
      <div className="register">
        <h1>register</h1>
        <RegisterForm handleSubmit={this.register} gotoWaitingRoom={gotoWaitingRoom} gotoLogin={gotoLogin} />
        <div className="register-nav">
          <Link to={urls.login()}>want to login?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  registerWithEmail: (creds: EmailPassword) => dispatch(registerWithEmail.action(creds)),
  gotoWaitingRoom: () => dispatch(push(urls.waitingRoom().confirmationEmail())),
  gotoLogin: () => dispatch(push(urls.login())),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
