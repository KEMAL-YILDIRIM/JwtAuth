import React from 'react';
import { useAuthenticateQuery } from '../generated/graphql';

interface Props {

}

export const Authenticate: React.FC<Props> = () => {
    const { data, error, loading } = useAuthenticateQuery({
        fetchPolicy: "network-only"
    });

    if (loading) return <div>loading...</div>
    if (error) {
        console.log({ AuthenticationError: error })
        return <div>Not Authenticated!</div>
    }
    
    if (!data) return <div>Response doesn't have any data to show.</div>

    return (
        <div>
            {data.Authenticate}
        </div>
    )
}
