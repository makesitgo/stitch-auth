import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import {
  AppState,
  SessionState,
  TestState,
  EmailPassword,
  login,
  register,
  resendConfirmationEmail,
  sendResetPasswordEmail,
  find
} from '../../state';
import { LoginForm, RegisterForm, UserManagement } from '../components';

interface StateProps {
  session: SessionState;
  test: TestState;
}

interface DispatchProps {
  gotoWelcome: () => void;
  gotoHome: () => void;
  login: (creds: EmailPassword) => Promise<void>;
  register: (creds: EmailPassword) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  find: () => Promise<void>;
}

type Props = StateProps & DispatchProps;

const initialState = { displayTab: 'login' };
type State = typeof initialState;

const toggleTab = (displayTab: string) => () => ({ displayTab });

const LOGIN_TAB = 'login';
const REGISTER_TAB = 'register';
const USER_MANAGEMENT_TAB = 'userManagement';

class Login extends React.Component<Props, State> {
  state: State = initialState;

  handleLogin = (creds: EmailPassword) => this.props.login(creds);

  handleRegister = (creds: EmailPassword) => this.props.register(creds);

  handleResendConfirmationEmail = () => this.props.resendConfirmationEmail(this.props.session.user!.profile.email!);

  handleSendResetPasswordEmail = () => this.props.sendResetPasswordEmail(this.props.session.user!.profile.email!);

  testFind = () => this.props.find();

  displayLogin = () => this.setState(toggleTab(LOGIN_TAB));

  displayRegister = () => this.setState(toggleTab(REGISTER_TAB));

  displayUserManagement = () => this.setState(toggleTab(USER_MANAGEMENT_TAB));

  isTabDisplayed = (displayTab: string) => displayTab === this.state.displayTab;

  render() {
    const {
      gotoWelcome,
      gotoHome,
      test: { docs, error },
    } = this.props;
    return (
      <div className="login">
        <h1>login page</h1>
        <div className="login-panel">
          <div className="login-panel-tabs">
            <button onClick={this.displayLogin} disabled={this.isTabDisplayed(LOGIN_TAB)}>login</button>
            <button onClick={this.displayRegister} disabled={this.isTabDisplayed(REGISTER_TAB)}>register</button>
            <button onClick={this.displayUserManagement} disabled={this.isTabDisplayed(USER_MANAGEMENT_TAB)}>user management</button>
          </div>
          {this.isTabDisplayed(LOGIN_TAB) && <LoginForm handleSubmit={this.handleLogin} />}
          {this.isTabDisplayed(REGISTER_TAB) && <RegisterForm handleSubmit={this.handleRegister} />}
          {this.isTabDisplayed(USER_MANAGEMENT_TAB) && <UserManagement handleResendConfirmationEmail={this.handleResendConfirmationEmail} handleSendResetPasswordEmail={this.handleSendResetPasswordEmail} />}
        </div>
        <div className="login-test">
          <button onClick={this.testFind}>test</button>
          {error && <pre>{JSON.stringify(error)}</pre>}
          {!error && <pre>{JSON.stringify(docs)}</pre>}
        </div>
        <div className="login-nav">
          <button className="login-nav-link" onClick={gotoWelcome}>
            go to welcome
          </button>
          <button className="login-nav-link" onClick={gotoHome}>
            go to home
          </button>
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
  gotoWelcome: () => dispatch(push('/')),
  gotoHome: () => dispatch(push('/home')),
  login: (creds: EmailPassword) => dispatch(login.action(creds)),
  register: (creds: EmailPassword) => dispatch(register.action(creds)),
  resendConfirmationEmail: (email: string) => dispatch(resendConfirmationEmail.action(email)),
  sendResetPasswordEmail: (email: string) => dispatch(sendResetPasswordEmail.action(email)),
  find: () => dispatch(find.action()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
