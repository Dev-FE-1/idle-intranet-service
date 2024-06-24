import Layout from './components/Layout';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

import homeIcon from '../public/icons/home-icon.svg';
import membersIcon from '../public/icons/members-icon.svg';
import profileIcon from '../public/icons/profile-icon.svg';
import clockIcon from '../public/icons/clock-icon.svg';

const menus = [
  { path: '/', title: '홈', icon: homeIcon },
  { path: '/members', title: '구성원', icon: membersIcon },
  { path: '/profile', title: '프로필', icon: profileIcon },
  { path: '/work-manage', title: '근무/휴가', icon: clockIcon },
];

class App {
  constructor() {
    this.Layout = new Layout({ container: '#app' });
    this.render();
  }

  render() {
    this.Header = new Header({ container: '.header-container' });
    this.NavBar = new NavBar({ container: '.navbar', menus });
    this.NavBar.active = '홈';
  }
}

document.addEventListener('DOMContentLoaded', new App());
