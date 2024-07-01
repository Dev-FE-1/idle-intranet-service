import './PersonalInfo.css';
import ProfileInfo from './ProfileInfo.js';
import WorkInfo from './WorkInfo.js';

export default class PersonalInfo {
  constructor({ user }) {
    this.ProfileInfo = new ProfileInfo({ user });
    this.WorkInfo = new WorkInfo();
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
