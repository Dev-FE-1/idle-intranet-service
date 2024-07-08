import { fetchUser, fetchWeeklyAttendances } from '../api/endpoints/user.js';
import { setTodayWork } from '../utils/userWork.js';

class Store {
  constructor() {
    this.Menu = null;
    this.user = null;
    this.weeklyAttendances = null;
    this.isWorking = null;
  }

  setMenu(menu) {
    this.Menu = menu;
  }

  async getUser() {
    if (this.user) return this.user;

    this.user = await fetchUser();
    return this.user;
  }

  async getUserIsWorking() {
    if (this.isWorking !== null) return this.isWorking;

    const weeklyAttendances = await this.getWeeklyAttendances();
    const today = new Date().toISOString().split('T')[0];
    const { startTime, endTime } =
      weeklyAttendances.filter((attendance) => attendance.date === today)[0] ||
      setTodayWork(today);

    this.isWorking = !!(startTime && !endTime);
    return this.isWorking;
  }

  async getWeeklyAttendances() {
    if (this.weeklyAttendances) return this.weeklyAttendances;

    this.weeklyAttendances = await fetchWeeklyAttendances();
    return this.weeklyAttendances;
  }
}

export const storeInstance = new Store();
