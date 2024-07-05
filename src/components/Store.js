import { fetchUser } from '../fetchData.js';

class Store {
  constructor() {
    this.user = null;
  }

  async getUser() {
    if (this.user) return this.user;

    const user = await fetchUser();
    return user;
  }
}

export const storeInstance = new Store();
