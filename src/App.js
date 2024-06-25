import Layout from './components/Layout';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Route from './routes/Route';
import { clockIcon, homeIcon, membersIcon, profileIcon } from './utils/icons';

const menus = [
  { path: '/', title: '홈', icon: homeIcon },
  { path: '/members', title: '구성원', icon: membersIcon },
  { path: '/profile', title: '프로필', icon: profileIcon },
  { path: '/work-manage', title: '근무/휴가', icon: clockIcon },
];

class App {
  constructor() {
    this.Layout = new Layout({ container: '#app' });
    this.Header = new Header({ container: '.header-container' });
    this.NavBar = new NavBar({ container: '.navbar', menus });
    this.Route = new Route(this.NavBar);
  }
}

document.addEventListener('DOMContentLoaded', new App());
