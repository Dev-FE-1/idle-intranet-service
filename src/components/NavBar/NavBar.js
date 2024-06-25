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
      .map(
        (menu) => `
      <li>
        <a href="${menu.path}" class="${this._active === menu.path ? 'active' : ''}">
          <img class="nav-icon" src=${menu.icon} alt="" />
          <span class="nav-menu">${menu.title}</span>
        </a>
      </li>
    `,
      )
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
