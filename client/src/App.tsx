import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { _constants } from './helpers/Constants';
import { setAccessToken } from './helpers/AccessToken';

interface Props { }

export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(_constants.refreshTokenUri, {
            method: "POST",
            credentials: "include"
        })
            .then(async r => {
                const { accessToken } = await r.json();
                setAccessToken(accessToken);
                setLoading(false);
            })
    }, [])

    if (loading) return <div>loading...</div>;

    return (
        <Routes />
    )
}
