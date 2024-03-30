import axios from 'axios';

const BASE_URL = 'https://api.carbonxco.com';
const VERSIONING = '/v1/c';
const API_URL = BASE_URL + VERSIONING;

const access_token = localStorage.getItem('accessToken');

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token || ''}`;
const createAPI = (baseURL = API_URL, config = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...config,
  });

  return axiosInstance;
};

const CarbonxApi = createAPI();

export { CarbonxApi };
