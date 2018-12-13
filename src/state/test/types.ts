import BSON from 'bson';
import { StitchServiceError } from 'mongodb-stitch-browser-sdk';

export interface TestDocument {
  _id: BSON.ObjectId;
  name: string;
}

export interface TestState {
  docs: TestDocument[];
  error?: Error | StitchServiceError;
}

export const initialTestState: TestState = { docs: [] }
