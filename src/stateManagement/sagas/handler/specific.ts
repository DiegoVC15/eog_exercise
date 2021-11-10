import { put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setDataChart } from '../../features/temps/temps';
import api from '../../../dataAPI/api';

const { call }: any = Effects;

type Measurement = {
  metric:string;
  at:Date;
  value:number;
  unit:string;
};
  type Measurements = {
    metric:string;
    measurements:Measurement[];
  };
export function* handleGetSpecificMetrics(action:PayloadAction<string[]>) {
  try {
    let after:number = yield call(api.getHeartBeat);
    after -= (30 * 60 * 1000);
    const response:Measurements[] = yield call(api.getSpecificMetrics, action.payload, after);
    yield put(setDataChart(response));
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}
