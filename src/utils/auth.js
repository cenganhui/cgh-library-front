const token = 'token';
const admin = 'admin';
const id = 'id';
const username = 'username';
const nickName = 'nickName';

export function getLoginInfo() {
    return {
        tokenKey: localStorage.getItem(token),
        adminKey: localStorage.getItem(admin),
        idKey: localStorage.getItem(id),
        usernameKey: localStorage.getItem(username),
        nickNameKey: localStorage.getItem(nickName),
    }
}

export function setLoginInfo(loginInfo) {
    localStorage.setItem(token, loginInfo.token);
    localStorage.setItem(admin, loginInfo.admin);
    localStorage.setItem(id, loginInfo.id);
    localStorage.setItem(username, loginInfo.username);
    localStorage.setItem(nickName, loginInfo.nickName);
}

export function removeLoginInfo() {
    localStorage.removeItem(token);
    localStorage.removeItem(admin);
    localStorage.removeItem(id);
    localStorage.removeItem(username);
    localStorage.removeItem(nickName);
}