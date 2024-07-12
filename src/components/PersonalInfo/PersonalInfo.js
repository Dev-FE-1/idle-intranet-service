import ProfileInfo from './ProfileInfo.js';
import WorkInfo from './WorkInfo.js';
import './PersonalInfo.css';
import { storeInstance } from '../Store.js';

export default class PersonalInfo {
  constructor({ member }) {
    this.isWorking = false;
    this.member = member;
    this.store = storeInstance;
    this.updateIsWorking();
    this.ProfileInfo = new ProfileInfo({ member, isWorking: this.isWorking });
    this.WorkInfo = new WorkInfo({ personalInfo: this });
  }

  async updateIsWorking() {
    this.isWorking = await this.store.getUserIsWorking();
    this.ProfileInfo = new ProfileInfo({
      member: this.member,
      isWorking: this.isWorking,
    });
    document.body.querySelector('.wrapper.personal-infos').innerHTML =
      `${this.ProfileInfo.html()}${this.WorkInfo.html()}`;
    this.render();
  }

  render() {
    this.ProfileInfo.render();
    this.WorkInfo.render();
  }

  html() {
    return `
    <section class="personal-info-section">
      <div class="wrapper personal-infos">
        ${this.ProfileInfo.html()}${this.WorkInfo.html()}
      </div>
    </section>`;
  }
}
