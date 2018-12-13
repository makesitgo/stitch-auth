import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { applyMiddleware, createStore, compose, Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { StitchAppClient, StitchAuth } from 'mongodb-stitch-browser-sdk';
import { AppState, AsyncContext, initialAppState, setUser } from '../state';
import buildRootReducers from '../state/reducers';

export default class Harness {
  public history: History;
  private middlewares: Middleware[];
  public store: Store<AppState>;

  constructor(public stitch: StitchAppClient) {
    this.history = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();

    this.middlewares = [
      routerMiddleware(this.history),
      thunk.withExtraArgument<AsyncContext>({ stitch }),
      createLogger({ duration: true })
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    this.store = createStore(
      buildRootReducers(this.history),
      initialAppState,
      composeEnhancers(applyMiddleware(...this.middlewares))
    );

    const dispatchSetUser = (auth: StitchAuth) => this.store.dispatch(setUser(auth.user))

    dispatchSetUser(stitch.auth);
    stitch.auth.addAuthListener({ onAuthEvent: dispatchSetUser });
  }
}
