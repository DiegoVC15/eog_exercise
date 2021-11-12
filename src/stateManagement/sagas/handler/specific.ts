import { put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setDataChart } from '../../features/temps/temps';
import api from '../../../dataAPI/api';
import { Measurements } from '../../../interfaces/interfaces';

const { call }: any = Effects;
const mapToChart = (response:Measurements[]) => {
  const listTemps = response[0].measurements.map(
    ({ metric, at, value }) => ({ name: at, [metric]: value }),
  );
  for (let i = 1; i < response.length; i += 1) {
    const { measurements } = response[i];
    measurements.reduce((acc, cur, idx) => {
      const { metric, value, at } = cur;
      if (!acc[idx]) acc[idx] = { name: at };
      acc[idx][metric] = value;
      return acc;
    }, listTemps);
  }
  return listTemps;
};
export function* handleGetSpecificMetrics(action:PayloadAction<string[]>) {
  try {
    let after:number = yield call(api.getHeartBeat);
    after -= (30 * 60 * 1000);
    const response:Measurements[] = yield call(api.getSpecificMetrics, action.payload, after);
    const listTemps = response.length === 0 ? [] : mapToChart(response);
    yield put(setDataChart(listTemps));
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}
