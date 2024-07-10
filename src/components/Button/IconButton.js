import './IconButton.css';

export default class IconButton {
  constructor({ icon }) {
    this.icon = icon;
  }

  html() {
    return /* HTML */ `
      <button class="icon-button">${this.icon.html()}</button>
    `;
  }
}
