import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Stitch/*, StitchAppClientConfiguration*/ } from 'mongodb-stitch-browser-sdk';
import { AppHarness, AppRouter } from './app';

require('../static/favicon.ico');
require('../static/main.less');

const stitch = Stitch.initializeDefaultAppClient(
  'stitch-auth-uycsq'
  // 'stitch-auth-russu',
  // new StitchAppClientConfiguration.Builder().withBaseUrl('http://localhost:8080').build()
);
const harness = new AppHarness(stitch);

const renderApp = (Component: typeof AppRouter) =>
  render(
    <Provider store={harness.store}>
      <AppContainer>
        <Component history={harness.history} />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );

renderApp(AppRouter);

if (module.hot) {
  module.hot.accept('./app/Router', () => {
    const appRouter = require('./app/Router');
    renderApp(appRouter);
  });
}
