import logo from '../../../public/images/logo.svg';
import './NavBar.css';

export default class NavBar {
  constructor({ container }) {
    this.$container = document.querySelector(container);
    this.render();
  }

  render() {
    this.$container.innerHTML = `
      <div class="logo-container desktop-only">
        <div class="logo">
          <img src=${logo} alt="" />
        </div>
        <strong class="logo-title">Cube.IT</strong>
      </div>
      <ul class="menu-list"></ul>
    `;
  }
}
