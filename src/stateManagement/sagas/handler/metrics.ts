import { call, put } from 'redux-saga/effects';
import { setMetrics } from '../../features/temps/temps';
import api from '../../../dataAPI/api';

export function* handleGetMetrics() {
  try {
    const response:string[] = yield call(api.getMetrics);
    yield put(setMetrics(response));
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}
