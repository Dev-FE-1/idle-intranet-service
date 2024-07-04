import ApiClient from './ApiClient.js';

export default class AuthService {
  constructor() {
    this.apiClient = new ApiClient(this.getToken);
  }

  login(email, password, showError) {
    return this.apiClient
      .post('/api/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status === 'OK') {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/';
        } else {
          showError(response.data.error);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          if (error.response.status === 400) {
            showError(`잘못된 요청입니다. ${error.response.data.error}`);
          } else if (error.response.status === 401) {
            showError(
              '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요!',
            );
          } else {
            showError(`오류: ${error.message}`);
          }
        } else {
          showError('알 수 없는 오류가 발생했습니다.');
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  }

  // eslint-disable-next-line class-methods-use-this
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    return localStorage.getItem('token');
  }
}
