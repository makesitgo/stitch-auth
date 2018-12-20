import actionCreatorFactory from 'typescript-fsa';
import { Alert } from '.';

const create = actionCreatorFactory('alerts');

export const working = create<boolean>('working');
export const addAlert = create<Alert>('add');
export const ackAlert = create('ack');
