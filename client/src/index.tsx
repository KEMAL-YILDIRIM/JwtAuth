import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from 'react';
import ReactDOM from 'react-dom';
import { getAccessToken } from './helpers/AccessToken';
import { _constants } from './helpers/Constants';
import { App } from "./App";

const client = new ApolloClient({
    uri: _constants.apolloClientUri,
    credentials: "include",
    request: (operation) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            operation.setContext({
                headers: {
                    authorization: `bearer ${accessToken}`
                }
            });
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));