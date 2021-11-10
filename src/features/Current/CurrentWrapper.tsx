import React, { FC, useEffect } from 'react';
import Current from './Current';
import { useAppSelector } from '../../stateManagement/Hooks/hooks';
import handleSubscribe from '../../stateManagement/sagas/handler/subscribe';

const CurrentWrapper: FC = () => {
  const actuals = useAppSelector((state) => state.counter.actual);
  const requested = useAppSelector((state) => state.counter.requested);
  const subscription = useAppSelector((state) => state.counter.subscription);
  useEffect(() => {
    handleSubscribe(requested.length, subscription);
  }, [requested]);
  return (
    <>{
    actuals.map(({ metric, value }) => (
      <Current
        key={value}
        metricName={metric}
        value={value}
      />
    ))
}
    </>
  );
};

export default CurrentWrapper;
