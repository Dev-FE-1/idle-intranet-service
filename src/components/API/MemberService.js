import ApiClient from './ApiClient.js';

export default class MemberService {
  constructor() {
    this.apiClient = new ApiClient(this.getToken);
  }

  loadPage(page, max) {
    return this.apiClient
      .get(`/api/members/${page}?max=${max}`)
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    return localStorage.getItem('token');
  }
}
