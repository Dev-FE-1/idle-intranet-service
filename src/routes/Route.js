import {
  HomePage,
  MembersPage,
  ProfilePage,
  WorkManagePage,
  PageNotFound,
} from '../pages';

export default class Route {
  constructor(Navbar) {
    this.homePage = new HomePage();
    this.membersPage = new MembersPage();
    this.profilePage = new ProfilePage();
    this.workManagePage = new WorkManagePage();
    this.notFoundPage = new PageNotFound();
    this.Navbar = Navbar;

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
    this.Navbar.active = path;
  }

  route() {
    const path = window.location.pathname;

    switch (path) {
      case '/':
        this.homePage.render();
        break;
      case '/members':
        this.membersPage.render();
        break;
      case '/profile':
        this.profilePage.render();
        break;
      case '/work-manage':
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
