import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;
export default (httpOptions = {}) => {
  const { url, headers } = httpOptions;
  const baseURL = url || `${REACT_APP_BACKEND_URL}/api/v1`;

  const axiosInstance = axios.create({
    baseURL,
    headers,
  });

  return axiosInstance;
};
