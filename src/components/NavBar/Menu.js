import Container from '../Container.js';
import Icon from '../Icon/Icon.js';
import { COLORS, PATH, PATH_TITLE } from '../../utils/constants.js';
import {
  clockIcon,
  homeIcon,
  membersIcon,
  profileIcon,
} from '../../utils/icons.js';

const menus = [
  { path: PATH.HOME, title: PATH_TITLE.HOME, icon: homeIcon },
  { path: PATH.MEMBERS, title: PATH_TITLE.MEMBERS, icon: membersIcon },
  { path: PATH.PROFILE, title: PATH_TITLE.PROFILE, icon: profileIcon },
  { path: PATH.WORK_MANAGE, title: PATH_TITLE.WORK_MANAGE, icon: clockIcon },
];

export default class Menu extends Container {
  constructor() {
    super('.menu-list');
    this.menus = menus;
    this._active = PATH.HOME;
  }

  set active(activeMenu) {
    this._active = activeMenu;
    this.render();
  }

  // 조건 정리해보기
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
