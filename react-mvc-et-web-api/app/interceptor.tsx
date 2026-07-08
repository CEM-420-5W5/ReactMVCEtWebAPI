import axios from "axios";

export const authenticatedRequest = axios.create();

authenticatedRequest.interceptors.request.use((config) => {

  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = "Bearer " + sessionStorage.getItem("token");

  return config;

});