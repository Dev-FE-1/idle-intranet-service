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
    }; // 객체를 생성해서 import 해오는 것도 좋아보인다.;
  }

  handleNavigatePage = (event) => {
    event.preventDefault();

    const anchor = event.target.closest('a');

    // if (!anchor?.href) return; 조건 간소화 가능
    // Early return 패턴을 사용하면 코드가 더 간결해질 수 있습니다.
    if (anchor && anchor.href) {
      window.history.pushState(null, null, anchor.href);
      this.route();
      this.activeNavBar();
    }
  };

  activeNavBar() {
    const path = window.location.pathname; // 상수로 관리해도 되지 않을까요?
    this.Menu.active = path;
  }

  route() {
    // 함수로 기능 분리해보기
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
