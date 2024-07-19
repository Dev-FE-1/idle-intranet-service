/* eslint-disable no-unused-expressions */
import Button from '../Button/Button.js';
import Icon from '../Icon/Icon.js';
import ProgressRing from '../ProgressRing.js/ProgressRing.js';
import CurrentTime from './CurrentTime.js';
import { COLORS } from '../../utils/constants.js';
import { clockIcon } from '../../utils/icons.js';
import './WorkInfo.css';
import { storeInstance } from '../Store.js';
import {
  calculateWeeklyWorkHours,
  setTodayWork,
} from '../../utils/userWork.js';
import { addAttendance, updateAttendance } from '../API/AttendanceService.js';
import Modal from '../Modal/Modal.js';

export default class WorkInfo {
  constructor({ PersonalInfo }) {
    this.store = storeInstance;
    this.weeklyAttendances = null;
    this.weeklyWorkHours = null;
    this.Icon = new Icon({
      svg: clockIcon,
      options: { color: COLORS.DARK_GRAY },
    });
    this.PersonalInfo = PersonalInfo;
    this.Modal = new Modal({ onSubmit: () => {}, id: 'work-toggle-modal' });
  }

  renderWeeklyWorkHours() {
    const $time = document.querySelector('.weekly-work-hours-time');
    if ($time) $time.innerHTML = `${this.weeklyWorkHours}시간`;
  }

  renderProgressRing() {
    const $container = document.querySelector('.progress-ring-container');
    const percent = (this.weeklyWorkHours / 40) * 100;
    this.ProgressRing = new ProgressRing({ percent });
    if ($container) $container.innerHTML = this.ProgressRing.html();
  }

  setModal({ title, mainContent, buttonContent, onSubmit }) {
    const modalWrapper = document.body.querySelector('.work-modal-wrapper');
    this.Modal.title = title;
    this.Modal.mainContent = mainContent;
    this.Modal.buttonContent = buttonContent;
    this.Modal.updateButton();
    this.Modal.onSubmit = onSubmit;
    modalWrapper.innerHTML = this.Modal.html();
  }

  getAttendance(today) {
    const attendance = this.weeklyAttendances.find((a) => a.date === today);

    if (!attendance) {
      const newAttendance = setTodayWork(today);
      this.weeklyAttendances.push(newAttendance);
      return newAttendance;
    }

    return attendance;
  }

  // eslint-disable-next-line class-methods-use-this
  setTime(element, time) {
    element.innerHTML = time;
    element.setAttribute('datetime', time);
  }

  async submitWorkEnd({ startTime, now, today }) {
    const $endTime = document.querySelector('.work-hour-time.end');
    const endTime = now;
    const attendance = this.getAttendance(today);
    this.setTime($endTime, endTime);

    const attendanceData = {
      employeeNumber: this.user.employeeNumber,
      date: today,
      startTime,
      endTime,
      status: '정상 근무',
    };

    await updateAttendance(attendanceData);
    attendance.endTime = endTime;
    await this.renderDailyWork();
    this.PersonalInfo.updateIsWorking();
  }

  async submitWorkStart({ now, today }) {
    const $startTime = document.querySelector('.work-hour-time.start');
    const startTime = now;
    const attendance = this.getAttendance(today);
    this.setTime($startTime, startTime);

    const attendanceData = {
      employeeNumber: this.user.employeeNumber,
      date: today,
      startTime,
      endTime: null,
      status: '정상 근무',
    };

    await addAttendance(attendanceData);
    attendance.startTime = startTime;
    await this.renderDailyWork();
    this.PersonalInfo.updateIsWorking();
  }

  async handleClickButton({ startTime, endTime }) {
    const $workHourTime = document.body.querySelector(
      '.work-hour-time.current',
    );
    const now = $workHourTime.innerHTML;
    const today = new Date().toISOString().split('T')[0];

    if (startTime && !endTime) {
      this.setModal({
        title: `현재 시각: ${now}`,
        mainContent: '근무를 종료하시겠습니까?',
        buttonContent: '근무 종료',
        onSubmit: () => this.submitWorkEnd({ startTime, now, today }),
      });
    } else if (!startTime) {
      this.setModal({
        title: `현재 시각: ${now}`,
        mainContent: '근무를 시작하시겠습니까?',
        buttonContent: '근무 시작',
        onSubmit: () => this.submitWorkStart({ now, today }),
      });
    }

    this.Modal.render();
    this.Modal.open();
  }

  renderButton(startTime, endTime) {
    const $buttonContainer = document.querySelector(
      '.work-hours-button-container',
    );

    this.Button = new Button({
      variant: startTime && !endTime ? 'primary' : 'secondary',
      size: 'large',
      content: startTime && !endTime ? '근무 종료' : '근무 시작',
      disabled: !!endTime,
    });

    if ($buttonContainer) $buttonContainer.innerHTML = this.Button.html();

    const $button = $buttonContainer.querySelector('button');
    $button.addEventListener('click', () =>
      this.handleClickButton({ startTime, endTime }),
    );
  }

  renderCurrentTime() {
    this.CurrentTime = new CurrentTime();
    this.CurrentTime.cleanUp();
    this.CurrentTime.render();
  }

  async renderDailyWork() {
    const $startTime = document.querySelector('.work-hour-time.start');
    const $endTime = document.querySelector('.work-hour-time.end');
    const today = new Date().toISOString().split('T')[0];
    const attendance = this.getAttendance(today);
    const { startTime, endTime } = attendance;

    this.renderButton(startTime, endTime);

    if (startTime) this.setTime($startTime, startTime);
    if (endTime) this.setTime($endTime, endTime);
  }

  async render() {
    if (!this.weeklyAttendances) {
      this.user = await this.store.getUser();
      this.weeklyAttendances = await this.store.getWeeklyAttendances();
      this.weeklyWorkHours = calculateWeeklyWorkHours(this.weeklyAttendances);
    }
    this.renderWeeklyWorkHours();
    this.renderProgressRing();
    this.renderCurrentTime();
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
          <div class="work-modal-wrapper"></div>
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
