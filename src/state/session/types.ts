import { StitchUser, StitchServiceError } from 'mongodb-stitch-browser-sdk';

export interface EmailPassword {
  email: string;
  password: string;
}

export interface TokenData {
  token: string;
  tokenId: string;
}

export interface TokenDataWithPassword extends TokenData {
  password: string;
}

export interface SessionState {
  user?: StitchUser;
  error?: StitchServiceError;
}

export const initialSessionState: SessionState = {};
