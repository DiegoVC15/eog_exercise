import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Measurement, Chart, MeasurementState } from '../../../interfaces/interfaces';

// Define the initial state using that type
const initialState: MeasurementState = {
  allMetrics: [],
  requested: [],
  dataChart: [],
  actual: [],
  heartBeat: 0,
  subscription: null,
};

export const measurementSlice = createSlice({
  name: 'measurement',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMetrics: () => {},
    setMetrics: (state, action: PayloadAction<string[]>) => {
      state.allMetrics = [...action.payload];
    },
    getRequested: (state, action: PayloadAction<string[]>) => {
      state.requested = [...action.payload];
      state.actual = state.actual.filter((element) => action.payload.some(
        (value) => value === element.metric,
      ));
    },
    setDataChart: (state, action: PayloadAction<Chart[]>) => {
      state.dataChart = [...action.payload];
    },
    setSubscription: (state, action: PayloadAction<ZenObservable.Subscription> | null) => {
      state.subscription = action ? action.payload : null;
    },
    unSubscription: (state) => {
      state.subscription = null;
    },
    setActual: (state, action: PayloadAction<Measurement>) => {
      const isInActual = state.requested.some((element) => element === action.payload.metric);
      if (isInActual) {
        const element = state.actual.find((value) => value.metric === action.payload.metric);
        if (element) element.value = action.payload.value;
        else state.actual.push(action.payload);
      }
    },
    updateChart: (state, action: PayloadAction<Measurement>) => {
      const isInActual = state.requested.some((element) => element === action.payload.metric);
      if (isInActual) {
        const last = state.dataChart[state.dataChart.length - 1]?.name;
        const existInChart = last === action.payload.at;
        if (existInChart) {
          state.dataChart[state.dataChart.length - 1][action.payload.metric] = action.payload.value;
        } else {
          state.dataChart.push({
            name: action.payload.at,
            [action.payload.metric]: action.payload.value,
          });
        }
      }
    },
  },
});
export const {
  getMetrics,
  setMetrics,
  getRequested,
  setDataChart,
  setSubscription,
  unSubscription,
  setActual,
  updateChart,
} = measurementSlice.actions;
export default measurementSlice.reducer;
