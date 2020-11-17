import http from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndpoint = '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  loginWithJwt(jwt);
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
}

export function logout() {
  sessionStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  }
  catch (ex) {
    return null;
  }
}

export function getJwt(){
  return sessionStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};