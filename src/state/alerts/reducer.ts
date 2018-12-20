import { buildReducer, newActionHandler } from '../../utils';
import { initialAlertsState, addAlert, ackAlert, working } from '.';

export default buildReducer(initialAlertsState, [
  newActionHandler(addAlert, (state, alert) => {
    state.queue.unshift(alert);
  }),
  newActionHandler(ackAlert, state => {
    state.queue.pop();
  }),
  newActionHandler(working, (state, isWorking) => {
    state.working = isWorking;
  })
]);
