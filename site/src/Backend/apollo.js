import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import config from '../../gql_config';

const headers = {
  'content-type': 'application/json',
  'X-Api-Key': config.aws_appsync_id
};
const getHeaders = () => {
  return headers;
};

const cache = new InMemoryCache();

const options = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const wsLink = new WebSocketLink({
  uri: `ws://${config.aws_appsync_graphqlEndpoint}`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  },
});

const httpLink = new HttpLink({
  uri: config.aws_appsync_graphqlEndpoint,
  headers: getHeaders()
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache,  
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    apiKey: config.aws_appsync_id
  },
  defaultOptions: options
});
