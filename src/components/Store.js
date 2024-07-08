import Layout from './Layout.js';
import Menu from './NavBar/Menu.js';
import { fetchUser, fetchWeeklyAttendances } from '../api/endpoints/user.js';

class Store {
  constructor() {
    this.Layout = new Layout();
    this.Menu = null;
    this.user = null;
    this.weeklyAttendances = null;
  }

  async getUser() {
    if (this.user) return this.user;

    this.user = await fetchUser();
    return this.user;
  }

  async getWeeklyAttendances() {
    if (this.weeklyAttendances) return this.weeklyAttendances;

    this.weeklyAttendances = await fetchWeeklyAttendances();
    return this.weeklyAttendances;
  }

  async renderLayout() {
    this.Layout.render();
    this.Menu = new Menu();
    this.Menu.render();
  }
}

export const storeInstance = new Store();
