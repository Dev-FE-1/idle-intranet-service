import { isLoggedIn, logout } from '../API/AuthService.js';
import Avatar from '../Avatar/Avatar.js';
import Button from '../Button/Button.js';
import Container from '../Container.js';
import { storeInstance } from '../Store.js';
import './Header.css';

export default class Header extends Container {
  constructor() {
    super('.header-container');
    this.store = storeInstance;
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
      size: 'small',
    });
  }

  async renderAvatar() {
    const isValidUser = await isLoggedIn();
    if (!isValidUser) return;
    if (!this.user) {
      this.user = await this.store.getUser();
      this.Avatar = new Avatar({
        url: this.user.profileImage,
      });
    }

    const $avatarContainer = document.querySelector('header .avatar-container');
    $avatarContainer.innerHTML = this.Avatar.html();
  }

  render() {
    this.$container.innerHTML = `
      <div class="wrapper">
        <div class="avatar-container"></div>
        <div class ='logout-btn-wrapper'>
          ${this.Button.html()}
        </div>
      </div>
    `;
    document
      .querySelector('.logout-btn-wrapper button')
      .addEventListener('click', logout);

    this.renderAvatar();
  }
}
