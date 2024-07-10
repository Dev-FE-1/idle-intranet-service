import './ManagementSection.css';

export default class ManagementSection {
  constructor({ title, contents }) {
    this.title = title;
    this.contents = contents;
  }

  html() {
    const allContents = this.contents.join('');
    return `
      <section class="management-section-container">
        <div class="wrapper">
          <h3 class="management-section-title">${this.title}</h3>
          ${allContents}
        </div>
      </section>
    `;
  }
}
