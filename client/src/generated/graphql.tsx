import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: LoginResponse,
  forgotPassword: Scalars['Boolean'],
  register: Scalars['Boolean'],
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  userId: Scalars['Int']
};


export type MutationRegisterArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  Greetings: Scalars['String'],
  Authenticate: Scalars['String'],
  GetAllUsers: Array<User>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
};

export type GreetingsQueryVariables = {};


export type GreetingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'Greetings'>
);


export const GreetingsDocument = gql`
    query Greetings {
  Greetings
}
    `;
export type GreetingsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GreetingsQuery, GreetingsQueryVariables>, 'query'>;

    export const GreetingsComponent = (props: GreetingsComponentProps) => (
      <ApolloReactComponents.Query<GreetingsQuery, GreetingsQueryVariables> query={GreetingsDocument} {...props} />
    );
    

/**
 * __useGreetingsQuery__
 *
 * To run a query within a React component, call `useGreetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGreetingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GreetingsQuery, GreetingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GreetingsQuery, GreetingsQueryVariables>(GreetingsDocument, baseOptions);
      }
export function useGreetingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GreetingsQuery, GreetingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GreetingsQuery, GreetingsQueryVariables>(GreetingsDocument, baseOptions);
        }
export type GreetingsQueryHookResult = ReturnType<typeof useGreetingsQuery>;
export type GreetingsLazyQueryHookResult = ReturnType<typeof useGreetingsLazyQuery>;
export type GreetingsQueryResult = ApolloReactCommon.QueryResult<GreetingsQuery, GreetingsQueryVariables>;