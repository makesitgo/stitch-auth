import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  StitchUser,
  StitchServiceError,
  UserPasswordCredential,
  UserPasswordAuthProviderClient
} from 'mongodb-stitch-browser-sdk';
import { AppState, AsyncContext, EmailPassword, TokenData, TokenDataWithPassword } from '../';

const create = actionCreatorFactory('session');
const createAsync = asyncFactory<AppState, AsyncContext>(create);

export const setUser = create<StitchUser | undefined>('set user');

export const login = createAsync<EmailPassword, StitchUser, StitchServiceError>(
  'login',
  ({ email, password }, _dispatch, _getState, { stitch }) =>
    stitch.auth.loginWithCredential(new UserPasswordCredential(email, password))
);

export const logout = createAsync<{}, void, StitchServiceError>(
  'logout',
  (_params, _dispatch, _getState, { stitch }) => stitch.auth.logout()
);

export const register = createAsync<EmailPassword, void, StitchServiceError>(
  'register',
  ({ email, password }, _dispatch, _getState, { stitch }) =>
    stitch
      .auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .registerWithEmail(email, password)
);

export const resendConfirmationEmail = createAsync<string, void, StitchServiceError>(
  'resend confirmation email',
  (email, _dispatch, _getState, { stitch }) =>
    stitch
      .auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .resendConfirmationEmail(email)
);

export const confirmUser = createAsync<TokenData, void, StitchServiceError>(
  'confirm user',
  ({ token, tokenId }, _dispatch, _getState, { stitch }) =>
    stitch
      .auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .confirmUser(token, tokenId)
);

export const sendResetPasswordEmail = createAsync<string, void, StitchServiceError>(
  'send reset password email',
  (email, _dispatch, _getState, { stitch }) =>
    stitch
      .auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .sendResetPasswordEmail(email)
);

export const resetPassword = createAsync<TokenDataWithPassword, void, StitchServiceError>(
  'reset password',
  ({ token, tokenId, password }, _dispatch, _getState, { stitch }) =>
    stitch
      .auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .resetPassword(token, tokenId, password)
);
