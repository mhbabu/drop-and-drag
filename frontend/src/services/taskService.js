import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/tasks";

function getTaskUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getTasks() {
  return http.get(apiEndPoint);
}

export function getTask(taskId) {
  return http.get(getTaskUrl(taskId));
}

export function saveTask(task) {
  if (task._id) { // for edit
    const body = { ...task };
    delete body._id;
    return http.put(getTaskUrl(task._id), body);
  }
  
  return http.post(apiEndPoint, task);
}

export function deleteTask(taskId) {
  return http.delete(getTaskUrl(taskId));
}
