import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { AppState } from '.';
import sessionReducer from './session/reducer';
import alertsReducer from './alerts/reducer';
import testReducer from './test/reducer';

const buildRootReducers: (h: History) => Reducer<AppState> = history => combineReducers({
  session: sessionReducer,
  alerts: alertsReducer,
  test: testReducer,
  router: connectRouter(history)
});

export default buildRootReducers;
