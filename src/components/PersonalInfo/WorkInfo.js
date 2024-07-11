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
  constructor({ personalInfo }) {
    this.store = storeInstance;
    this.weeklyAttendances = null;
    this.weeklyWorkHours = null;
    this.Icon = new Icon({
      svg: clockIcon,
      options: { color: COLORS.DARK_GRAY },
    });
    this.personalInfo = personalInfo;
    this.modal = new Modal({ onSubmit: () => {}, id: 'work-toggle-modal' });
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
    this.modal.title = title;
    this.modal.mainContent = mainContent;
    this.modal.buttonContent = buttonContent;
    this.modal.updateButton();
    this.modal.onSubmit = onSubmit;
    modalWrapper.innerHTML = this.modal.html();
  }

  async renderDailyWork() {
    const today = new Date().toISOString().split('T')[0];
    let attendance = this.weeklyAttendances.find((a) => a.date === today);

    if (!attendance) {
      attendance = setTodayWork(today);
      this.weeklyAttendances.push(attendance);
    }

    let { startTime, endTime } = attendance;
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

    if ($buttonContainer) $buttonContainer.innerHTML = this.Button.html();

    this.CurrentTime = new CurrentTime();
    this.CurrentTime.cleanUp();
    this.CurrentTime.render();

    if (startTime) {
      $startTime.innerText = startTime;
      $startTime.setAttribute('datetime', startTime);
    }
    if (endTime) {
      $endTime.innerText = endTime;
      $endTime.setAttribute('datetime', endTime);
    }

    $buttonContainer
      .querySelector('button')
      .addEventListener('click', async () => {
        const now = document.body.querySelector(
          '.work-hour-time.current',
        ).innerHTML;

        if (startTime && !endTime) {
          this.setModal({
            title: `현재 시각: ${now}`,
            mainContent: '근무를 종료하시겠습니까?',
            buttonContent: '근무 종료',
            onSubmit: async () => {
              endTime = now;
              $endTime.innerText = endTime || '-';
              $endTime.setAttribute('datetime', endTime);
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
              this.personalInfo.updateIsWorking();
            },
          });
        } else if (!startTime) {
          this.setModal({
            title: `현재 시각: ${now}`,
            mainContent: '근무를 시작하시겠습니까?',
            buttonContent: '근무 시작',
            onSubmit: async () => {
              startTime = now;
              $startTime.innerText = startTime || '-';
              $startTime.setAttribute('datetime', startTime);
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
              this.personalInfo.updateIsWorking();
            },
          });
        }
        this.modal.render();
        this.modal.open();
      });
  }

  async render() {
    if (!this.weeklyAttendances) {
      this.user = await this.store.getUser();
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
