import ProfileInfo from './ProfileInfo.js';
import WorkInfo from './WorkInfo.js';
import './PersonalInfo.css';

export default class PersonalInfo {
  constructor() {
    this.ProfileInfo = new ProfileInfo();
    this.WorkInfo = new WorkInfo();
  }

  render() {
    this.ProfileInfo.render();
    this.WorkInfo.render();
  }

  html() {
    return `
      <section class="personal-info-section">
        <div class="wrapper">
          ${this.ProfileInfo.html()}
          ${this.WorkInfo.html()}
        </div>
      </section>
    `;
  }
}
