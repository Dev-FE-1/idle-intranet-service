import { fetchUser } from '../fetchData.js';

class Store {
  constructor() {
    this.user = null;
  }

  async getUser() {
    if (this.user) return this.user;

    this.user = await fetchUser();
    return this.user;
  }
}

export const storeInstance = new Store();
