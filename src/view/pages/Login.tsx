import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
import { urls } from '../../utils';
import { AppState, SessionState, EmailPassword, login } from '../../state';
import { LoginForm } from '../components';

interface StateProps {
  session: SessionState;
}

interface DispatchProps {
  login: (creds: EmailPassword) => Promise<StitchUser>;
  gotoConfirmationEmail: () => void;
}

type Props = StateProps & DispatchProps;

class Login extends React.Component<Props> {
  ['login'] = (creds: EmailPassword) => this.props.login(creds);

  render() {
    const { gotoConfirmationEmail } = this.props;
    return (
      <div className="login">
        <h1>login</h1>
        <LoginForm handleSubmit={this.login} gotoConfirmationEmail={gotoConfirmationEmail} />
        <div className="login-nav">
          <Link to={urls.register()}>need to register?</Link>
          <Link to={urls.passwordResetEmail()}>forgot password?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  session: state.session,
  test: state.test,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: (creds: EmailPassword) => dispatch(login.action(creds)),
  gotoConfirmationEmail: () => dispatch(push(urls.confirmationEmail())),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
