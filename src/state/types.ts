import { RouterState } from 'connected-react-router';
import { StitchAppClient } from 'mongodb-stitch-browser-sdk';
import { initialSessionState, SessionState, initialTestState, TestState } from '.';

export interface AsyncContext {
  stitch: StitchAppClient;
}

export interface AppState {
  session: SessionState;
  test: TestState;
  router: RouterState;
}

export const initialAppState: AppState = {
  session: initialSessionState,
  test: initialTestState,
  router: {
    location: { pathname: '', search: '', state: {}, hash: '' },
    action: 'PUSH',
  },
};
