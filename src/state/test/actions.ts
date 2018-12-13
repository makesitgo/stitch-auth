import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { AppState, AsyncContext, TestDocument } from '../';

const create = actionCreatorFactory('test');
const createAsync = asyncFactory<AppState, AsyncContext>(create);

export const find = createAsync<{}, TestDocument[]>(
  'find',
  (_params, _dispatch, _getState, { stitch }) =>
    stitch
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('db')
      .collection<TestDocument>('coll')
      .find({})
      .asArray()
);
