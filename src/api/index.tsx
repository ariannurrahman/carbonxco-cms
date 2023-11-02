import axios from 'axios';

const BASE_URL = 'http://43.218.223.109';
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
