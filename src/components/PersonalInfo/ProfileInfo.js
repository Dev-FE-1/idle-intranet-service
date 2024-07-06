import Avatar from '../Avatar/Avatar.js';
import './ProfileInfo.css';
import { storeInstance } from '../Store.js';

export default class ProfileInfo {
  constructor() {
    this.store = storeInstance;
    this.isWorking = false; // 임시
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
    this.renderAvatar();
    this.renderUserInfo();
  }

  html() {
    return `
      <div class="profile-info">
        <div class="avatar-container"></div>
        <div class="personal-profile">
          <div class="work-status-label${this.isWorking ? ' active' : ''}">${this.isWorking ? '근무중' : '근무전'}</div>
          <h2 class="profile-name"></h2>
          <span class="profile-position"></span>
        </div>
      </div>
    `;
  }
}
