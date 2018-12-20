import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { ErrorBoundary, App } from '../view/components';

export default class Router extends React.Component<any> {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ConnectedRouter>
    );
  }
}
