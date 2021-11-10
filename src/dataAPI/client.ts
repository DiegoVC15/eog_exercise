import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';

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
export default client;
