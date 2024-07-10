import logo from '../../../public/images/logo.svg';
import Container from '../Container.js';
import './NavBar.css';

export default class NavBar extends Container {
  constructor() {
    super('.navbar');
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
