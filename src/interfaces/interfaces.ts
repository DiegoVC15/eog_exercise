export interface Measurement {
    metric: string,
    at: number,
    value: number,
    unit: string,
  }
  export interface Chart {
    [key: string]: string | number
  }
  export interface MeasurementState {
    allMetrics:string[],
    requested:string[],
    dataChart:Chart[],
    actual: Measurement[],
    heartBeat:number,
    subscription: ZenObservable.Subscription | null
  }
  export interface Metric {
    metricName: string;
    value: number;
  }
  export interface Measurements {
    metric:string;
    measurements:Measurement[];
  }