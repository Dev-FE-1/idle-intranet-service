import Avatar from '../Avatar/Avatar.js';
import './ProfileInfo.css';
import { storeInstance } from '../Store.js';
import { setTodayWork } from '../../utils/userWork.js';

export default class ProfileInfo {
  constructor() {
    this.store = storeInstance;
  }

  renderLabel() {
    const $label = document.querySelector('.work-status-label');
    if (this.isWorking) {
      $label.classList.add('active');
      $label.innerText = '근무중';
    } else {
      $label.classList.remove('active');
      $label.innerText = '근무전';
    }
  }

  renderAvatar() {
    const $container = document.querySelector(
      '.profile-info .avatar-container',
    );
    $container.innerHTML = this.Avatar.html();
  }

  renderUserInfo() {
    const $nameContainer = document.querySelector(
      '.personal-profile .profile-name',
    );
    const $positionContainer = document.querySelector(
      '.personal-profile .profile-position',
    );
    $nameContainer.innerText = this.user.name;
    $positionContainer.innerText = this.user.position;
  }

  async render() {
    if (!this.user) {
      this.user = await this.store.getUser();
      this.Avatar = new Avatar({
        url: this.user.profileImage,
        size: 'large',
      });
    }

    if (!this.isWorking) {
      const weeklyAttendances = await this.store.getWeeklyAttendances();
      const today = new Date().toISOString().split('T')[0];
      const { startTime, endTime } =
        weeklyAttendances.filter(
          (attendance) => attendance.date === today,
        )[0] || setTodayWork(today);

      this.isWorking = !!(startTime && !endTime);
    }

    this.renderLabel();
    this.renderAvatar();
    this.renderUserInfo();
  }

  html() {
    return `
      <div class="profile-info">
        <div class="avatar-container"></div>
        <div class="personal-profile">
          <div class="work-status-label"></div>
          <h2 class="profile-name"></h2>
          <span class="profile-position"></span>
        </div>
      </div>
    `;
  }
}
