import Avatar from '../Avatar/Avatar.js';
import './ProfileInfo.css';
import { storeInstance } from '../Store.js';

export default class ProfileInfo {
  constructor({ member, isWorking }) {
    this.store = storeInstance;
    this.member = member;
    this.isWorking = isWorking;
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
    $nameContainer.innerText = this.member.name;
    $positionContainer.innerText = this.member.position;
  }

  render() {
    this.Avatar = new Avatar({
      url: this.member.profileImage,
      size: 'large',
    });

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
