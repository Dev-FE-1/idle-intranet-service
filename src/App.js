import Layout from './components/Layout';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

import homeIcon from '../public/icons/home-icon.svg';
import membersIcon from '../public/icons/members-icon.svg';
import profileIcon from '../public/icons/profile-icon.svg';
import clockIcon from '../public/icons/clock-icon.svg';
import {
  HomePage,
  MembersPage,
  ProfilePage,
  WorkManagePage,
  PageNotFound,
} from './pages';

const menus = [
  { path: '/', title: '홈', icon: homeIcon },
  { path: '/members', title: '구성원', icon: membersIcon },
  { path: '/profile', title: '프로필', icon: profileIcon },
  { path: '/work-manage', title: '근무/휴가', icon: clockIcon },
];

class App {
  constructor() {
    this.Layout = new Layout({ container: '#app' });
    this.homePage = new HomePage();
    this.notFoundPage = new PageNotFound();
    this.membersPage = new MembersPage();
    this.profilePage = new ProfilePage();
    this.workManagePage = new WorkManagePage();

    this.render();
    this.init();
    this.route();
  }

  route() {
    const path = window.location.pathname;
    console.log(path);

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
    this.NavBar.active = path;
  }

  navigatePage = (event) => {
    event.preventDefault();

    const anchor = event.target.closest('a');

    if (anchor && anchor.href) {
      history.pushState(null, null, anchor.href);
      this.route();
    }
  };

  init() {
    window.addEventListener('popstate', this.route);
    document.body.addEventListener('click', this.navigatePage);
  }

  render() {
    this.Header = new Header({ container: '.header-container' });
    this.NavBar = new NavBar({ container: '.navbar', menus });
    this.NavBar.active = '홈';
  }
}

document.addEventListener('DOMContentLoaded', new App());
