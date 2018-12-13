import { buildReducer, newActionHandler, newAsyncActionHandler } from '../../utils';
import { initialSessionState, setUser, login, logout, register } from '.';

export default buildReducer(initialSessionState, [
  newActionHandler(setUser, (state, user) => {
    state.user = user;
  }),
  newAsyncActionHandler(login.async, {
    onSuccess: (state, { result }) => {
      state.user = result;
      delete state.error;
    },
    onFailure: (state, { error }) => {
      delete state.user;
      state.error = error;
    },
  }),
  newAsyncActionHandler(logout.async, {
    onSuccess: state => {
      delete state.user;
      delete state.error;
    },
    onFailure: (state, { error }) => {
      state.error = error;
    },
  }),
  newAsyncActionHandler(register.async, {
    onFailure: (state, { error }) => {
      state.error = error;
    },
  }),
]);
