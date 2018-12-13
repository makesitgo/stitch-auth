import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login, NotFound, Welcome, ConfirmEmail, ResetPassword } from '../../pages';

const Content = () => (
  <div className="content">
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/confirmEmail" component={ConfirmEmail} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Content;
