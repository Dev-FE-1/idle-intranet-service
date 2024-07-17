import axios from 'axios';
import { API_BASE_URL } from './config.js';
import { handleAPIError } from './errorHandling.js';

// api 함수들이 너무 파편화 되어있다.
// fetchData, components/API, api/... 등등
// 그리고 fetch를 사용하는 곳과 axios를 사용하는 곳이 섞여있다.
// apiClient를 만들어서 사용하는 것이라면, axios의 인터셉터를 사용해보자.
// axios의 인터셉터를 사용하면, 요청과 응답을 가로채서 처리할 수 있다.
// 이를 통해, apiClient에서 공통적으로 처리해야하는 로직을 처리할 수 있다.
// 예를 들어, 토큰을 넣어주는 것이나, 에러를 처리하는 것 등이 있다.

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
