import logo from '../../../public/images/logo.svg';
import homeIcon from '../../../public/icons/home-icon.svg';
import membersIcon from '../../../public/icons/members-icon.svg';
import profileIcon from '../../../public/icons/profile-icon.svg';
import clockIcon from '../../../public/icons/clock-icon.svg';
import './Navigation.css';

export class Navigation {
  constructor() {
    this.el = document.createElement('nav');
    this.el.className = 'navbar';
    this.render();
  }

  render() {
    this.el.innerHTML = `
      <div class="logo-container desktop-only">
        <div class="logo">
          <img src=${logo} alt="" />
        </div>
        <strong class="logo-title">Cube.IT</strong>
      </div>
      <ul class="menu-list">
        <li>
          <a href="javascript:void(0)">
            <img class="nav-icon" src=${homeIcon} alt="" />
            <span class="nav-menu">홈</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img class="nav-icon" src=${membersIcon} alt="" />
            <span class="nav-menu">구성원</span>
          </a>
        </li>
        <li class="menu-profile">
          <a href="javascript:void(0)">
            <img class="nav-icon" src=${profileIcon} alt="" />
            <span class="nav-menu">프로필</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img class="nav-icon" src=${clockIcon} alt="" />
            <span class="nav-menu">근무/휴가</span>
          </a>
        </li>
      </ul>
      `;
  }
}
