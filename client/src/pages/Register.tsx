import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';


export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation();

    return (
        <form onSubmit={async e => {
            e.preventDefault();
            console.log(`Form submittet with email: ${email} and password: ${password}`);
            const response = await register({
                variables: {
                    email,
                    password
                }
            });
            console.log({ RegisterResponse: response });
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
            <button type="submit">Register</button>
        </form>
    )
}
