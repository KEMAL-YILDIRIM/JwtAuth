let _accessToken: String = "";

export function setAccessToken(token: String){
    _accessToken = token;
    return true;
}

export function getAccessToken(){
    return _accessToken;
}