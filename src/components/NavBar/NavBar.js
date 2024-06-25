import Icon from '../Icon/Icon';
import { COLORS } from '../../utils/constants';
import logo from '../../../public/images/logo.svg';
import './NavBar.css';

export default class NavBar {
  constructor({ container, menus }) {
    this.$container = document.querySelector(container);
    this.menus = menus;
    this._active = null;
    this.menusHtml = this.getMenuHtml();
    this.render();
  }

  set active(activeMenu) {
    this._active = activeMenu;
    this.menusHtml = this.getMenuHtml();
    this.render();
  }

  getMenuHtml() {
    return this.menus
      .map((menu) => {
        const isActive = this._active === menu.path;
        const icon = new Icon({
          svg: menu.icon,
          options: {
            color: isActive ? COLORS.PRIMARY : COLORS.BLACK,
          },
        });

        return `
      <li>
        <a href="${menu.path}" class="${isActive ? 'active' : ''}">
          ${icon.html()}
          <span class="nav-menu">${menu.title}</span>
        </a>
      </li>
    `;
      })
      .join('');
  }

  render() {
    this.$container.innerHTML = `
      <div class="logo-container desktop-only">
        <div class="logo">
          <img src=${logo} alt="" />
        </div>
        <strong class="logo-title">Cube.IT</strong>
      </div>
      <ul class="menu-list">
        ${this.menusHtml}
      </ul>
    `;
  }
}
