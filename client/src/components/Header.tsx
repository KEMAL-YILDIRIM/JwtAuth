import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from '../helpers/AccessToken';

interface Props {

}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
    const [Logout, { client }] = useLogoutMutation();

    let loginPanel;

    if (loading) {
        loginPanel =
            <div>
                loading...
            </div>;
    }
    else if (data && data.Me) {
        loginPanel =
            <div>
                <div>
                    {data.Me.email}
                </div>
                <div>
                    <button onClick={
                        async () => {
                            await Logout();
                            setAccessToken("");
                            await client!.resetStore();
                        }
                    }>
                        Logout
                </button>
                </div>
            </div>;
    }
    else {
        loginPanel =
            <div>
                <Link to="/Login">Login</Link>
            </div>;
    }

    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/Register">Register</Link>
            </div>
            <div>
                <Link to="/Authenticate">Authenticate</Link>
            </div>
            {loginPanel}
        </header>
    )
}
