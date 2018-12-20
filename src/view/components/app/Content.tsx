import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
import { urls } from '../../../utils';
import { PrivateRoute, WaitingRoom } from '..';
import {
  NotFound,
  Welcome,
  Home,
  Login,
  Register,
  ConfirmationEmail,
  PasswordResetEmail,
  ConfirmEmail,
  ResetPassword,
} from '../../pages';

interface Props {
  user?: StitchUser;
}

class Content extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <div className="content">
        <Switch>
          <Route exact path={urls.welcome()} component={Welcome} />
          <PrivateRoute
            user={user}
            permit={user => !user}
            redirectTo={urls.home()}
            path={urls.login()}
            component={Login}
          />
          <Route path={urls.register()} component={Register} />
          <PrivateRoute
            user={user}
            permit={user => !user}
            redirectTo={urls.home()}
            path={urls.confirmationEmail()}
            component={ConfirmationEmail}
          />
          <Route path={urls.passwordResetEmail()} component={PasswordResetEmail} />
          <Route path={urls.confirmEmail()} component={ConfirmEmail} />
          <Route path={urls.resetPassword()} component={ResetPassword} />
          <Route
            path={urls.waitingRoom().route()}
            render={props => <WaitingRoom emailTopic={props.match.params.emailTopic} />}
          />
          <PrivateRoute user={user} path={urls.home()} component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
export default Content;
