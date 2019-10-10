import React from 'react'
import { useGetAllUsersQuery } from '../generated/graphql'

interface Props {

}

export const Home: React.FC<Props> = () => {
    const { data } = useGetAllUsersQuery({ fetchPolicy: "network-only" });

    if (!data)
        return (<div>loading...</div>)

    return (
        <div>
            <div>Users:</div>
            <ul>
                {data.GetAllUsers.map(u => {
                    return (
                        <li key={u.id}>User email: {u.email} id: {u.id}</li>
                    )
                })}
            </ul>
        </div>
    )
}
