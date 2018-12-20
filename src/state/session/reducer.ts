import { buildReducer, newActionHandler } from '../../utils';
import { initialSessionState, setUser } from '.';

export default buildReducer(initialSessionState, [
  newActionHandler(setUser, (state, user) => {
    state.user = user;
  }),
]);
