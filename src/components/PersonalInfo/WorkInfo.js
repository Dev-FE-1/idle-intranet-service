import Button from '../Button/Button.js';
import Icon from '../Icon/Icon.js';
import ProgressRing from '../ProgressRing.js/ProgressRing.js';
import { COLORS } from '../../utils/constants.js';
import { clockIcon } from '../../utils/icons.js';
import './WorkInfo.css';
import { storeInstance } from '../Store.js';
import {
  calculateWeeklyWorkHours,
  setTodayWork,
} from '../../utils/userWork.js';

export default class WorkInfo {
  constructor() {
    this.store = storeInstance;
    this.weeklyAttendances = null;
    this.weeklyWorkHours = null;
    this.Icon = new Icon({
      svg: clockIcon,
      options: { color: COLORS.DARK_GRAY },
    });
  }

  renderWeeklyWorkHours() {
    const $time = document.querySelector('.weekly-work-hours-time');
    $time.innerHTML = `${this.weeklyWorkHours}시간`;
  }

  renderProgressRing() {
    const $container = document.querySelector('.progress-ring-container');
    const percent = (this.weeklyWorkHours / 40) * 100;
    this.ProgressRing = new ProgressRing({ percent });
    this.Button = null;
    $container.innerHTML = this.ProgressRing.html();
  }

  renderDailyWork() {
    const today = new Date().toISOString().split('T')[0];
    const { startTime, endTime } =
      this.weeklyAttendances.filter(
        (attendance) => attendance.date === today,
      )[0] || setTodayWork(today);

    this.Button = new Button({
      variant: startTime && !endTime ? 'primary' : 'secondary',
      size: 'large',
      content: startTime && !endTime ? '근무 종료' : '근무 시작',
      disabled: !!endTime,
    });

    const $buttonContainer = document.querySelector(
      '.work-hours-button-container',
    );
    const $startTime = document.querySelector('.work-hour-time.start');
    const $endTime = document.querySelector('.work-hour-time.end');

    $buttonContainer.innerHTML = this.Button.html();
    $startTime.innerText = startTime;
    $endTime.innerText = endTime;
  }

  async render() {
    if (!this.weeklyAttendances) {
      this.weeklyAttendances = await this.store.getWeeklyAttendances();
      this.weeklyWorkHours = calculateWeeklyWorkHours(this.weeklyAttendances);
    }
    this.renderWeeklyWorkHours();
    this.renderProgressRing();
    this.renderDailyWork();
  }

  html() {
    return /* HTML */ `
      <div class="work-info-container">
        <div class="work-info weekly-work-hours">
          ${this.Icon.html()}
          <div class="weekly-work-hours-title">이번 주 근무 시간</div>
          <strong class="weekly-work-hours-time"></strong>
          <div class="progress-ring-container"></div>
        </div>
        <div class="work-info daily-work-hours">
          <ul class="work-hours-list">
            <li>
              <div class="work-hour-title">현재 시각</div>
              <time class="work-hour-time current" datetime=""></time>
            </li>
            <li>
              <div class="work-hour-title">근무 시작</div>
              <time class="work-hour-time start" datetime="">-</time>
            </li>
            <li>
              <div class="work-hour-title">근무 종료</div>
              <time class="work-hour-time end" datetime="">-</time>
            </li>
          </ul>
          <div class="work-hours-button-container" type="button"></div>
        </div>
      </div>
    `;
  }
}
