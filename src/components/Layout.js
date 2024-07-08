import Container from './Container.js';
import Header from './Header/Header.js';
import NavBar from './NavBar/NavBar.js';
import Menu from './NavBar/Menu.js';
import { storeInstance } from './Store.js';

export default class Layout extends Container {
  constructor() {
    super('#app');
    this.store = storeInstance;
  }

  renderHeader() {
    this.Header = new Header();
    this.Header.render();
  }

  renderNavbar() {
    this.NavBar = new NavBar();
    this.NavBar.render();

    this.Menu = new Menu();
    this.Menu.render();
    this.store.setMenu(this.Menu);
  }

  render() {
    this.$container.innerHTML = `
      <header class="header-container desktop-only"></header>
      <nav class="navbar"></nav>
      <main id="main" class="main-container"></main>
    `;

    this.renderHeader();
    this.renderNavbar();
  }
}
