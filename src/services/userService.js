import http from "./httpService";

const apiUsers = '/users';

export function register(user) {
  return http.post(apiUsers, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  });
}
