import Container from './Container.js';
import Header from './Header/Header.js';
import NavBar from './NavBar/NavBar.js';

export default class Layout extends Container {
  constructor() {
    super('#app');
  }

  renderHeader() {
    this.Header = new Header();
    this.Header.render();
  }

  renderNavbar() {
    this.NavBar = new NavBar();
    this.NavBar.render();
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
