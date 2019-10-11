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
    if(!_accessToken) return true;
    console.log({AccessToken : _accessToken});

    const { exp } = jwtDecode(_accessToken);
    console.log({expiration : exp});

    if (exp * 1000 <= Date.now()) return true;

    return false;
}