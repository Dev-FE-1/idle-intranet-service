import Icon from '../Icon/Icon';
import { COLORS, PATH } from '../../utils/constants';

export default class Menu {
  constructor(container, menus) {
    this.$container = document.querySelector(container);
    this.menus = menus;
    this._active = PATH.HOME;
    this.render();
  }

  set active(activeMenu) {
    this._active = activeMenu;
    this.render();
  }

  isActiveMenu(path) {
    if (path === PATH.HOME && this._active === PATH.HOME) {
      return true;
    }
    if (path === PATH.HOME) {
      return false;
    }

    return this._active.startsWith(path);
  }

  render() {
    this.$container.innerHTML = this.menus
      .map((menu) => {
        const isActive = this.isActiveMenu(menu.path);
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
}
