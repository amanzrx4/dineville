import axios from "axios";
import { stringify } from "qs";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT,
  paramsSerializer: (params) => stringify(params, { arrayFormat: "repeat" }),
});
