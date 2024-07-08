import { fetchUser, fetchWeeklyAttendances } from '../api/endpoints/user.js';

class Store {
  constructor() {
    this.Menu = null;
    this.user = null;
    this.weeklyAttendances = null;
  }

  setMenu(menu) {
    this.Menu = menu;
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
}

export const storeInstance = new Store();
