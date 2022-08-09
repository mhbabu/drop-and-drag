import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
