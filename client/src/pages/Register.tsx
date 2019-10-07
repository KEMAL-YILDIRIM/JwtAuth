import React from 'react'
import { useRegisterMutation } from '../generated/graphql';

interface Props {

}

export const Register: React.FC<Props> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation();

    return (
        <form onSubmit={async e => {
            e.preventDefault();
            console.log(`Form submittet with email: ${email} and password: ${password}`);
            const response = await register({
                variables:{
                    email,
                    password
                }
            });
            console.log(response);
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
