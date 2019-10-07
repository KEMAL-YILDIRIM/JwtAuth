import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
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

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type GreetingsQueryVariables = {};


export type GreetingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'Greetings'>
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GreetingsDocument = gql`
    query Greetings {
  Greetings
}
    `;

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