import { COLORS } from '../../utils/constants.js';
import { logoutIcon } from '../../utils/icons.js';
import { isLoggedIn, logout } from '../API/AuthService.js';
import Avatar from '../Avatar/Avatar.js';
import Button from '../Button/Button.js';
import Container from '../Container.js';
import Icon from '../Icon/Icon.js';
import { storeInstance } from '../Store.js';
import './Header.css';

export default class Header extends Container {
  constructor() {
    super('.header-container');
    this.store = storeInstance;
    this.icon = new Icon({
      svg: logoutIcon,
      options: {
        color: COLORS.DARKEST_GRAY,
        size: '14px',
      },
    });
    this.Button = new Button({
      variant: 'ghost',
      content: `${this.icon.html()} 로그아웃`,
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
    // wrapper와 container의 차이?
    // 보통 container는 여러 컴포넌트를 감싸는 역할을 하고, wrapper는 단일 컴포넌트를 감싸는 역할을 합니다.
    // 몰라도 된다
    this.$container.innerHTML = /* HTML */ `
      <div class="wrapper header-items">
        <div class="avatar-container"></div>
        <div class="logout-btn-wrapper">${this.Button.html()}</div>
      </div>
    `;
    document
      .querySelector('.logout-btn-wrapper button')
      .addEventListener('click', logout);

    this.renderAvatar();
  }
}
