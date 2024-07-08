import { logout } from '../API/AuthService.js';
import Button from '../Button/Button.js';
import Container from '../Container.js';
import './Header.css';

export default class Header extends Container {
  constructor() {
    super('.header-container');
    // this.profileImage = user && user.profileImage;
    // this.userName = user && user.name;
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
      size: 'small',
    });
  }

  render() {
    this.$container.innerHTML = `
      <div class="wrapper">
        <div class="header-profile">
          <img
            class="header-profile-image"
            src="${this.profileImage || 'https://api.dicebear.com/9.x/lorelei/svg?seed=Max&eyes=variant09'}"
            alt="${this.userName || '김직원'}"
          />
        </div>
        <div class ='logout-btn-wrapper'>
          ${this.Button.html()}
        </div>
      </div>
    `;
    document
      .querySelector('.logout-btn-wrapper button')
      .addEventListener('click', logout);
  }
}
