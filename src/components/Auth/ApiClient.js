import axios from 'axios';

export default class ApiClient {
  constructor(getToken) {
    this.client = axios.create();

    this.client.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; //BEARER 토큰 사용
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          //권한이 없는 경우 어떻게 할 것인가...?
        }
        return Promise.reject(error);
      },
    );
  }

  get(url, config = {}) {
    return this.client.get(url, config);
  }

  post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }
}
