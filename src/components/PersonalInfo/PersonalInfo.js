import dayjs from 'dayjs';

import ProfileInfo from './ProfileInfo.js';
import WorkInfo from './WorkInfo.js';
import './PersonalInfo.css';

export default class PersonalInfo {
  constructor({ user }) {
    this.ProfileInfo = new ProfileInfo({ user });
    this.WorkInfo = new WorkInfo();
  }

  updateTime() {
    const currentTime = dayjs().format('HH:mm');

    const $time = document.querySelector('.work-hour-time');
    $time.setAttribute('datetime', currentTime);
    $time.innerText = currentTime;
  }

  getNextUpdateDelay() {
    const now = dayjs();
    const nextMinuteStart = now.add(1, 'minute').startOf('minute');
    const delay = nextMinuteStart.diff(now);

    return delay;
  }

  html() {
    return `
      <section class="personal-info-section">
        <div class="wrapper">
          ${this.ProfileInfo.html()}
          ${this.WorkInfo.html()}
        </div>
      </section>
    `;
  }
}
