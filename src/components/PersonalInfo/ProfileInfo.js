import Avatar from '../Avatar/Avatar';
import './ProfileInfo.css';

export default class ProfileInfo {
  constructor({ user }) {
    this.user = user;
    this.Avatar = new Avatar({
      url: this.user.profileImage,
      size: 'large',
    });
    this.isWorking = false;
  }

  html() {
    return `
      <div class="profile-info">
        ${this.Avatar.html()}
        <div class="personal-profile">
          <div class="work-status-label${this.isWorking ? ' active' : ''}">${this.isWorking ? '근무중' : '근무전'}</div>
          <h2 class="profile-name">${this.user.name}</h2>
          <span>${this.user.role}</span>
        </div>
      </div>
    `;
  }
}
