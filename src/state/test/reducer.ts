import { buildReducer, newAsyncActionHandler } from '../../utils';
import { initialTestState, find } from '.';

export default buildReducer(initialTestState, [
  newAsyncActionHandler(find.async, {
    onRequest: state => {
      state.docs = [];
      delete state.error;
    },
    onSuccess: (state, { result }) => {
      state.docs = result;
      delete state.error;
    },
    onFailure: (state, { error }) => {
      state.docs = [];
      state.error = error;
    },
  }),
]);
