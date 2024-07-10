import { isLoggedIn } from '../components/API/AuthService.js';
import { storeInstance } from '../components/Store.js';
import AnnouncementPage from '../pages/Announcement/Announcement.js';
import {
  HomePage,
  MembersPage,
  ProfilePage,
  WorkManagePage,
  SignInPage,
  PageNotFound,
} from '../pages/index.js';
import ProfileSpecPage from '../pages/ProfileSpec/ProfileSpec.js';
import { PATH_TITLE, PATH } from '../utils/constants.js';
import { matchRoute } from '../utils/matchRoute.js';

export default class Route {
  constructor() {
    this.title = 'CubeIT ';
    this.currentPage = null;
  }

  setRoutes() {
    this.routes = {
      [PATH.HOME]: { title: PATH_TITLE.HOME, page: new HomePage() },
      [PATH.ANNOUNCEMENT]: {
        title: PATH_TITLE.ANNOUNCEMENT,
        page: new AnnouncementPage(),
      },
      [PATH.MEMBER]: { title: PATH_TITLE.MEMBERS, page: new ProfileSpecPage() },
      [PATH.MEMBERS]: { title: PATH_TITLE.MEMBERS, page: new MembersPage() },
      [PATH.PROFILE]: { title: PATH_TITLE.PROFILE, page: new ProfilePage() },
      [PATH.WORK_MANAGE]: {
        title: PATH_TITLE.WORK_MANAGE,
        page: new WorkManagePage(),
      },
      [PATH.SIGNIN]: { title: PATH_TITLE.SIGNIN, page: new SignInPage() },
    };
  }

  handleNavigatePage = (event) => {
    event.preventDefault();

    const anchor = event.target.closest('a');

    if (anchor && anchor.href) {
      window.history.pushState(null, null, anchor.href);
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

    isLoggedIn().then((result) => {
      if (!result && path !== PATH.SIGNIN) {
        window.history.pushState(null, null, PATH.SIGNIN);
        this.routes[PATH.SIGNIN].page.render();
      }
    });

    const matchedRoute = matchRoute(path, this.routes);

    if (this.currentPage && this.currentPage.cleanUp) {
      this.currentPage.cleanUp();
    }

    if (matchedRoute && matchedRoute.page) {
      this.currentPage = matchedRoute.page;
      document.title = this.title + matchedRoute.title;
      this.currentPage.render();
    } else {
      this.notFoundPage.render();
    }

    this.activeNavBar();
  }

  init() {
    window.addEventListener('popstate', () => this.route());
    document.body.addEventListener('click', this.handleNavigatePage);
    this.Menu = storeInstance.Menu;
    this.notFoundPage = new PageNotFound();
    this.setRoutes();
    this.route();
  }
}
