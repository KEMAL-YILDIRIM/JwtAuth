import jwtDecode from 'jwt-decode';

let _accessToken: string = "";

export function setAccessToken(token: string) {
    _accessToken = token;
    console.log(`Set acess token : ${token}`)
    return true;
}

export function getAccessToken() {
    console.log(`Get acess token : ${_accessToken}`)
    return _accessToken;
}

export function isTokenExpired() {
    if (!_accessToken) return true;

    const { exp } = jwtDecode(_accessToken);
    if (exp * 1000 <= Date.now()) return true;

    return false;
}