import Layout from './Layout.js';
import Menu from './NavBar/Menu.js';
import { fetchUser } from '../fetchData.js';

class Store {
  constructor() {
    this.Layout = new Layout();
    this.Menu = null;
    this.user = null;
  }

  async getUser() {
    if (this.user) return this.user;

    this.user = await fetchUser();
    return this.user;
  }

  async renderLayout() {
    this.Layout.render();
    this.Menu = new Menu();
    this.Menu.render();
  }
}

export const storeInstance = new Store();
