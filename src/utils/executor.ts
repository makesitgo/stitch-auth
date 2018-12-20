import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Alert, AppState, AsyncContext, addAlert, working } from '../state';

export const asyncActionExecutor = <T>(
  dispatch: ThunkDispatch<AppState, AsyncContext, AnyAction>,
  asyncActionGenerator: () => Promise<T>
) => async (successMsg?: string, errorMsg?: string) => {
  dispatch(working(true));
  return asyncActionGenerator()
    .then(res => {
      dispatch(working(false));
      if (successMsg) {
        dispatch(addAlert(Alert('success', successMsg)));
      }
      return res;
    })
    .catch(err => {
      dispatch(working(false));
      if (errorMsg) {
        dispatch(addAlert(Alert('error', errorMsg)));
      } else {
        const { name, message } = err;
        dispatch(addAlert(Alert('error', `${name}: ${message}`)));
      }
      throw err;
    });
};
