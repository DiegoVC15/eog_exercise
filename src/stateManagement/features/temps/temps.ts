import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface Measurement {
  metric: string,
  at: Date,
  value: number,
  unit: string,
}
interface Measurements {
  metric:string,
  measurements:Measurement[],
  color?:string
}
interface MeasurementState {
  allMetrics:string[],
  requested:string[],
  dataChart:Measurements[],
  actual: Measurement[],
  heartBeat:number,
  subscription: ZenObservable.Subscription | null
}

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
      state.allMetrics = action.payload;
    },
    getRequested: (state, action: PayloadAction<string[]>) => {
      state.requested = action.payload;
      state.actual = state.actual.filter((element) => action.payload.some(
        (value) => value === element.metric,
      ));
    },
    setDataChart: (state, action: PayloadAction<Measurements[]>) => {
      state.dataChart = action.payload.map((measurement) => ({
        ...measurement,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }
      ));
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
        else state.actual = [...state.actual, action.payload];
        const historical = state.dataChart.find(metric => metric.metric === action.payload.metric);
        historical?.measurements.push(action.payload);
      }
    },
  },
});
export const {
  getMetrics, setMetrics, getRequested, setDataChart, setSubscription, unSubscription, setActual,
} = measurementSlice.actions;
export default measurementSlice.reducer;
