import React, { FC } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

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
const Chart:FC = () => {
  const metricNames = ['oilTemp', 'waterTemp', 'flareTemp'];
  const after = 1635960759520;
  const input = metricNames.map(element => ({ metricName: element, after }));
  const { loading, error, data } = useQuery<MeasurementResponse>(query, {
    variables: {
      input,
    },
  });
  if (loading) return <LinearProgress />;
  if (error) return <div>Error</div>;
  if (!data) return <div>Data</div>;
  const listTemps = data.getMultipleMeasurements[0].measurements.map(
    ({ metric, at, value }) => ({ name: at, [metric]: value }),
  );
  for (let i = 1; i < data.getMultipleMeasurements.length; i += 1) {
    const { measurements } = data.getMultipleMeasurements[i];
    measurements.reduce((acc, cur, idx) => {
      const { metric, value } = cur;
      acc[idx][metric] = value;
      return acc;
    }, listTemps);
  }
  return (
    <LineChart
      width={1000}
      height={300}
      data={listTemps}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey={props => { const dt = new Date(props.name); return `${dt.getHours()}:${dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes()}`; }} interval={600} />
      <YAxis />
      <Tooltip labelFormatter={(_label, payload) => {
        if (payload[0]?.payload) {
          return `${new Date(payload[0].payload.name).toLocaleString()}`;
        }
        return null;
      }}
      />
      <Legend />
      {metricNames.map(element => <Line type="basis" dataKey={`${element}`} dot={false} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />)}
    </LineChart>
  );
};
export default () => (
  <ApolloProvider client={client}>
    <Chart />
  </ApolloProvider>
);
