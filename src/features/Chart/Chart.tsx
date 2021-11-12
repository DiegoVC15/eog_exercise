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
  const requested = useAppSelector((state) => state.counter.requested);
  const colors:{ [key:string]:string } = {
    OilTemp: '#641e16', waterTemp: '#4a235a', injValveOPen: ' #154360', flareTemp: ' #0e6251', tubingPressure: '#7d6608', casingPressure: '#17202a',
  };
  if (requested.length === 0) return <></>;
  return (
    <LineChart
      width={1700}
      height={600}
      data={data}
      margin={{
        top: 10,
        right: 31,
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
        interval={250}
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
      {requested.map(metric => (
        <Line
          key={metric}
          type="basis"
          dataKey={`${metric}`}
          dot={false}
          stroke={colors[metric]}
        />
      ))}
    </LineChart>
  );
};
export default Chart;
