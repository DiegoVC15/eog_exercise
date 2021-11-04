import React, { FC } from 'react';
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  ApolloProvider,
  useSubscription,
  gql,
  InMemoryCache,
} from '@apollo/client';
import Current from './Current';

const wsLink = new WebSocketLink({
  uri: 'ws://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const CurrentWrapper: FC = () => {
  const COMMENTS_SUBSCRIPTION = gql`
    subscription{
        newMeasurement{
          metric,
          value
        }
      }
`;
  const { loading, error, data } = useSubscription(COMMENTS_SUBSCRIPTION);
  if (loading) return <div>Error</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>Data</div>;
  console.log(data);
  const { metric, value } = data.newMeasurement;
  return (<Current metricName={metric} value={value} />);
};

export default () => (
  <ApolloProvider client={client}>
    <CurrentWrapper />
  </ApolloProvider>
);
