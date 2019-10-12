import jwtDecode from 'jwt-decode';

let _accessToken: string = "";

export function setAccessToken(token: string) {
    _accessToken = token;
    return true;
}

export function getAccessToken() {
    return _accessToken;
}

export function isTokenValidOrUndefined() {
    if (!_accessToken) {
        console.log({ AccessTokenUndefined: _accessToken });
        return true;
    }

    const { exp } = jwtDecode(_accessToken);

    if (exp * 1000 <= Date.now()) {
        console.log({ accessTokenExpirationDate: exp, DateNow: Date.now() });
        return true;
    }

    return false;
}