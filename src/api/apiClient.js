import axios from 'axios';
import { API_BASE_URL } from './config.js';
import { handleAPIError } from './errorHandling.js';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiCall({
  endpoint,
  method = 'get',
  params = {},
  data = null,
  auth = false,
}) {
  try {
    const config = {
      url: endpoint,
      method,
      params,
      data,
    };

    if (auth) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    const apiError = handleAPIError(error);
    throw apiError;
  }
}

export default apiClient;
