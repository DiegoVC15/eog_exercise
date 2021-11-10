import { gql } from '@apollo/client/core';
import client from './client';

type MetricsResponse = {
  getMetrics: string[];
};

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
type MeasurementResponse = {
  getMultipleMeasurements:Measurements[];
};

export const getMetrics = async () => {
  const query = gql`
    query{
      getMetrics
    }
  `;
  const { data } = await client.query<MetricsResponse>({
    query,
  });
  return data.getMetrics;
};

export const getHeartBeat = async () => {
  const query = gql`
    query{
      heartBeat
    }
  `;
  const { data } = await client.query<{ heartBeat:number }>({
    query,
  });
  return data.heartBeat;
};

export const getSpecificMetrics = async (metrics:string[], timestamp:Date) => {
  const query = gql`
  query ($input: [MeasurementQuery]!) {
    getMultipleMeasurements(input: $input) {
      metric,
      measurements {
        metric,
        at,
        value,
        unit
      }
    }
  }
`;
  const input = metrics.map(element => ({ metricName: element, after: timestamp }));
  const { data } = await client.query<MeasurementResponse>({
    query,
    variables: {
      input,
    },
  });
  return data.getMultipleMeasurements;
};

export const subscribeToMetrics = (setActual:any) => {
  const query = gql`
  subscription{
    newMeasurement{
      metric,
      value,
      at,
      unit
    }
  }
`;
  const observable = client.subscribe({
    query,
  });
  return observable.subscribe(({ data }) => {
    setActual(data.newMeasurement);
  });
};
