import Avatar from '../Avatar/Avatar.js';
import './ProfileInfo.css';
import { storeInstance } from '../Store.js';
import { isLoggedIn } from '../API/AuthService.js';
import EditProfileButton from './EditProfileButton.js';

export default class ProfileInfo {
  constructor({ member, isWorking }) {
    this.store = storeInstance;
    this.member = member;
    this.isWorking = isWorking;
    this.user = null;
  }

  async renderEditButton() {
    const isValidUser = await isLoggedIn();
    if (!isValidUser) return;
    if (!this.user) {
      this.user = await this.store.getUser();
    }

    const { isAdmin } = this.user;
    const isOwner = this.user.employeeNumber === this.member.employeeNumber;

    if (!isAdmin && !isOwner) return;

    const $container = document.querySelector(
      '.profile-info .edit-profile-button-container',
    );
    this.editButton = new EditProfileButton({
      container: $container,
      member: this.member,
    });
    this.editButton.render();
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
    this.renderEditButton();
  }

  html() {
    return /* HTML */ `
      <div class="profile-info">
        <div class="edit-profile-button-container"></div>
        <div class="avatar-container"></div>
        <div class="personal-profile">
          <div class="work-status-label${this.isWorking ? ' active' : ''}">
            ${this.isWorking ? '근무중' : '근무전'}
          </div>
          <h2 class="profile-name"></h2>
          <span class="profile-position"></span>
        </div>
      </div>
    `;
  }
}
