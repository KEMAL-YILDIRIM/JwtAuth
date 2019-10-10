import React from 'react';
import { useAuthenticateQuery } from '../generated/graphql';

interface Props {

}

export const Authenticate: React.FC<Props> = () => {
    const { data, error, loading } = useAuthenticateQuery();

    if (loading) return <div>loading...</div>
    if (!data) return <div>Response doesn't have any data to show.</div>
    if (error) {
        console.log(error)
        return <div>There is an error occured!</div>
    }

    return (
        <div>
            {data.Authenticate}
        </div>
    )
}
