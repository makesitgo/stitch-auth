import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
import { urls } from '../../../utils';

interface Props extends RouteProps {
  user?: StitchUser;
  permit?: (user?: StitchUser) => boolean;
  redirectTo?: string;
}

const PrivateRoute = ({
  user,
  permit = user => !!user,
  redirectTo = urls.login(),
  component: Component,
  render,
  ...rest
}: Props) => {
  const permitted = permit(user);
  return (
    <Route
      {...rest}
      render={props => {
        if (permitted) {
          if (Component) {
            return <Component {...props} />;
          }
          if (render) {
            return render(props);
          }
        }
        return <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />;
      }}
    />
  );
};

export default PrivateRoute;
