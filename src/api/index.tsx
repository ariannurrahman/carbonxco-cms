import axios from 'axios';

const BASE_URL = 'https://1819-2001-448a-3005-17be-d21-11a2-b188-fd4d.ngrok-free.app';
const VERSIONING = '/api/v1';
const API_URL = BASE_URL + VERSIONING;
const createAPI = (baseURL = API_URL, config = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    },
    ...config,
  });

  return axiosInstance;
};

const VIPApi = createAPI();

export default VIPApi;
