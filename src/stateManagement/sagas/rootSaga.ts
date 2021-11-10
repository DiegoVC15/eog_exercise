import { all, takeLatest } from 'redux-saga/effects';
import { getMetrics, getRequested } from '../features/temps/temps';
import { handleGetMetrics } from './handler/metrics';
import { handleGetSpecificMetrics } from './handler/specific';

export function* rootSaga() {
  yield all([
    takeLatest(getRequested.type, handleGetSpecificMetrics),
    takeLatest(getMetrics.type, handleGetMetrics),
  ]);
}
