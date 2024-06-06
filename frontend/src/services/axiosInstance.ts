import axios from "axios";
import { backend_base_url, login_token } from "../env-variables";

const axiosInstance = axios.create({
  baseURL: backend_base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const loginToken = localStorage.getItem(login_token);
    config.headers.Authorization = `Bearer ${loginToken ? loginToken : ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
