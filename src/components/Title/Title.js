import './Title.css';

export default class Title {
  constructor({
    title,
    subtitle = '',
    description = '',
    contents = '',
    desktopOnly = '',
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.contents = contents;
    this.desktopOnly = desktopOnly;
  }

  html() {
    return `
      <div class="page-title-container${this.desktopOnly && ' desktop-only'}">
        <div class="wrapper">
            ${this.subtitle && `<div class="page-subtitle">${this.subtitle}</div>`}
            <h1 class="page-title">${this.title}</h1>
            ${this.description && `<p class="page-title-description">${this.description}</p>`}
        </div>
      </div>
    `;
  }
}
