import { fetchAttendances } from '../../api/endpoints/attendance.js';
import {
  calculateWeeklyCumulativeHours,
  getDayOfWeek,
} from '../../utils/userWork.js';

import { storeInstance } from '../Store.js';
import Table from '../Table/Table.js';
import './WorkingTab.css';

function formatValue(value) {
  return value == null ? '-' : value;
}

export default class WorkingTab {
  constructor() {
    this.store = storeInstance;
    this.attendances = [];
    this.cumulativeWeeklyHours = 0;
  }

  async setWeeklyAttendances() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    this.attendances = await fetchAttendances(this.user.employeeNumber);
  }

  renderTable = () => {
    const weeklyCumulativeHours = calculateWeeklyCumulativeHours(
      this.attendances,
    );

    const transformedAttendances = this.attendances.map((attendance) => {
      const dayOfWeek = getDayOfWeek(attendance.date);
      const { cumulativeHours } = weeklyCumulativeHours.find(
        (wh) => wh.date === attendance.date,
      );

      return [
        `${formatValue(attendance.date)} (${dayOfWeek})`,
        formatValue(attendance.startTime),
        formatValue(attendance.endTime),
        formatValue(cumulativeHours),
      ];
    });

    transformedAttendances.reverse();

    this.table = new Table({
      headers: ['날짜 (요일)', '출근 시각', '퇴근 시각', '주간 근무 시간'],
      contents: transformedAttendances,
      width: 25,
    });

    return this.table.html();
  };

  async renderWorkingHistory() {
    this.$workingHistoryContainer = document.querySelector(
      '.working-history-container',
    );

    if (!this.attendances.length) {
      await this.setWeeklyAttendances();
    }

    if (this.$workingHistoryContainer) {
      this.$workingHistoryContainer.innerHTML = this.renderTable();
    }
  }

  async render() {
    this.$workingTabContainer = document.querySelector(
      '#main .working-tab-container',
    );

    this.$workingTabContainer.innerHTML = /* HTML */ `
      <h3 class="working-tab-title">근무내역</h3>
      <div class="working-history-container"></div>
    `;
    await this.setWeeklyAttendances();
    this.renderWorkingHistory();
  }
}
