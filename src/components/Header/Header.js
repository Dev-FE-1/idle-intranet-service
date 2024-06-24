import profileImage from '../../../public/images/user-default.svg';
import './Header.css';

export default class Header {
  constructor() {
    this.el = document.createElement('header');
    this.el.className = 'header-container desktop-only';
    this.render();
  }

  render() {
    this.el.innerHTML = `
      <div class="wrapper">
        <div class="header-profile">
          <img
            class="header-profile-image"
            src=${profileImage}
            alt="김직원 프로필"
          />
        </div>
      </div>
    `;
  }
}
