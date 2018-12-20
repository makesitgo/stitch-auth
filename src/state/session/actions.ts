import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  StitchAppClient,
  StitchUser,
  StitchServiceError,
  UserPasswordCredential,
  UserPasswordAuthProviderClient
} from 'mongodb-stitch-browser-sdk';
import { asyncActionExecutor } from '../../utils';
import { AppState, AsyncContext, EmailPassword, TokenData, TokenDataWithPassword } from '..';

const create = actionCreatorFactory('session');
const createAsync = asyncFactory<AppState, AsyncContext>(create);

export const clearError = create('clear error');

export const setUser = create<StitchUser | undefined>('set user');

export const login = createAsync<EmailPassword, StitchUser, StitchServiceError>(
  'login',
  ({ email, password }, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => stitch.auth.loginWithCredential(new UserPasswordCredential(email, password))
    )('You have successfully logged in')
);

export const logout = createAsync<{}, void, StitchServiceError>(
  'logout',
  (_params, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => stitch.auth.logout()
    )('You have successfully logged out')
);

const userPasswordClient = (stitch: StitchAppClient) =>
  stitch
    .auth
    .getProviderClient(UserPasswordAuthProviderClient.factory);

export const registerWithEmail = createAsync<EmailPassword, void, StitchServiceError>(
  'register',
  ({ email, password }, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => userPasswordClient(stitch).registerWithEmail(email, password)
    )('A confirmation email has been sent to your inbox.')
);

export const resendConfirmationEmail = createAsync<string, void, StitchServiceError>(
  'resend confirmation email',
  (email, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => userPasswordClient(stitch).resendConfirmationEmail(email)
    )('A confirmation email has been sent to your inbox.')
);

export const confirmUser = createAsync<TokenData, void, StitchServiceError>(
  'confirm user',
  ({ token, tokenId }, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => userPasswordClient(stitch).confirmUser(token, tokenId)
    )('You have successfully confirmed your email.')
);

export const sendResetPasswordEmail = createAsync<string, void, StitchServiceError>(
  'send reset password email',
  (email, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => userPasswordClient(stitch).sendResetPasswordEmail(email)
    )('A password reset email has been sent to your inbox.')
);

export const resetPassword = createAsync<TokenDataWithPassword, void, StitchServiceError>(
  'reset password',
  ({ token, tokenId, password }, dispatch, _getState, { stitch }) =>
    asyncActionExecutor(
      dispatch,
      () => userPasswordClient(stitch).resetPassword(token, tokenId, password)
    )('You have successfully reset your password.')
);
