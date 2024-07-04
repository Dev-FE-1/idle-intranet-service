import ApiClient from './ApiClient.js';

export default class AuthService {
  constructor() {
    this.apiClient = new ApiClient(this.getToken);
  }

  login(email, password) {
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
          alert(response.data.error);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          if (error.response.status === 400) {
            alert(`잘못된 요청: ${error.response.data.error}`);
          } else if (error.response.status === 401) {
            alert(
              '인증 실패: 로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요!',
            );
          } else {
            alert(`오류: ${error.message}`);
          }
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
