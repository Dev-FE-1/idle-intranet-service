import Menu from '../components/NavBar/Menu';
import {
  HomePage,
  MembersPage,
  ProfilePage,
  WorkManagePage,
  SignInPage,
  PageNotFound,
} from '../pages';
import { MENUS, PATH } from '../utils/constants';
import { clockIcon, homeIcon, membersIcon, profileIcon } from '../utils/icons';

const menus = [
  { path: PATH.HOME, title: MENUS.HOME, icon: homeIcon },
  { path: PATH.MEMBERS, title: MENUS.MEMBERS, icon: membersIcon },
  { path: PATH.PROFILE, title: MENUS.PROFILE, icon: profileIcon },
  { path: PATH.WORK_MANAGE, title: MENUS.WORK_MANAGE, icon: clockIcon },
];

export default class Route {
  constructor() {
    this.homePage = new HomePage();
    this.membersPage = new MembersPage();
    this.profilePage = new ProfilePage();
    this.workManagePage = new WorkManagePage();
    this.notFoundPage = new PageNotFound();
    this.signInPage = new SignInPage();
    this.Menu = new Menu('.menu-list', menus);

    this.init();
  }

  handleNavigatePage = (event) => {
    event.preventDefault();

    const anchor = event.target.closest('a');

    if (anchor && anchor.href) {
      history.pushState(null, null, anchor.href);
      this.route();
      this.activeNavBar();
    }
  };

  activeNavBar() {
    const path = window.location.pathname;
    this.Menu.active = path;
  }

  route() {
    const path = window.location.pathname;

    switch (path) {
      case PATH.SIGNIN:
        this.signInPage.render();
        break;
      case PATH.HOME:
        this.homePage.render();
        break;
      case PATH.MEMBERS:
        this.membersPage.render();
        break;
      case PATH.PROFILE:
        this.profilePage.render();
        break;
      case PATH.WORK_MANAGE:
        this.workManagePage.render();
        break;
      default:
        this.notFoundPage.render();
        break;
    }

    this.activeNavBar();
  }

  init() {
    window.addEventListener('popstate', this.route);
    document.body.addEventListener('click', this.handleNavigatePage);
    this.route();
  }
}
