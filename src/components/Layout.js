export default class Layout {
  constructor({ container }) {
    this.$container = document.querySelector(container);
    this.render();
  }

  render() {
    this.$container.innerHTML = `
      <header class="header-container desktop-only"></header>
      <nav class="navbar"></nav>
      <main id="main" class="main-container"></main>
    `;
  }
}
