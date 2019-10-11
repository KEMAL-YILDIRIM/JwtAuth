import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useLoginMutation } from '../generated/graphql';
import { setAccessToken } from '../helpers/AccessToken';


export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();

    return (
        <form onSubmit={async e => {
            e.preventDefault();
            console.log(`Form submittet with email: ${email} and password: ${password}`);
            const response = await login({
                variables: {
                    email,
                    password
                }
            });

            if (response && response.data) {
                setAccessToken(response.data.Login.accessToken);
            }

            console.log(`Login response : ${response}`);
            history.push("/");
        }}>
            <div>
                <input
                    value={email}
                    placeholder="email"
                    onChange={e => { setEmail(e.target.value) }}
                />
            </div>
            <div>
                <input
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={e => { setPassword(e.target.value) }}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
