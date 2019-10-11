import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { getAccessToken, isTokenValidOrUndefined, setAccessToken } from './helpers/AccessToken';
import { _constants } from './helpers/Constants';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
      .then((operation) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          operation.setContext({
            headers: {
              authorization: `bearer ${accessToken}`
            }
          });
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => isTokenValidOrUndefined(),
      fetchAccessToken: () => {
        return fetch(_constants.refreshTokenUri, {
          method: "POST",
          credentials: "include"
        });
      },
      handleFetch: accessToken => {
        setAccessToken(accessToken);
      },
      handleError: err => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);

        // your custom action here
        // user.logout();
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log({ GraphQLErrors: graphQLErrors });
      }
      if (networkError) {
        console.log({ NetworkError: networkError });
      }
    }),
    requestLink,
    new HttpLink({
      uri: _constants.apolloClientUri,
      credentials: 'include'
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));