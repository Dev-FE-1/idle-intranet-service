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
        alert('Error:', error);
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
