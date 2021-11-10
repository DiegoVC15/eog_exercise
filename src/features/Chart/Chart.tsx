import React, { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useAppSelector } from '../../stateManagement/Hooks/hooks';

const Chart:FC = () => {
  const data = useAppSelector((state) => state.counter.dataChart);
  if (data.length === 0) return <div>Error</div>;
  const listTemps = data[0].measurements.map(
    ({ metric, at, value }) => ({ name: at, [metric]: value }),
  );
  for (let i = 1; i < data.length; i += 1) {
    const { measurements } = data[i];
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
      <XAxis
        dataKey={props => {
          const dt = new Date(props.name); return `${dt.getHours()}:${dt.getMinutes() < 10
            ? `0${dt.getMinutes()}` : dt.getMinutes()}`;
        }}
        interval={600}
      />
      <YAxis />
      <Tooltip labelFormatter={(_label, payload) => {
        if (payload[0]?.payload) {
          return `${new Date(payload[0].payload.name).toLocaleString()}`;
        }
        return null;
      }}
      />
      <Legend />
      {data.map(element => (
        <Line
          type="basis"
          dataKey={`${element.metric}`}
          dot={false}
          // stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        />
      ))}
    </LineChart>
  );
};
export default Chart;
