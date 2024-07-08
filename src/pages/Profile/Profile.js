import { isLoggedIn, logout } from '../../components/API/AuthService.js';
import Button from '../../components/Button/Button.js';
import Container from '../../components/Container.js';
import PersonalDetails from '../../components/PersonalInfo/PersonalDetails.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import { storeInstance } from '../../components/Store.js';
import Title from '../../components/Title/Title.js';
import { PATH_TITLE } from '../../utils/constants.js';
import './Profile.css';

export default class ProfilePage extends Container {
  constructor() {
    super('#main');
    this.store = storeInstance;
    this.Title = new Title({
      title: PATH_TITLE.PROFILE,
      desktopOnly: true,
    });
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
    });
  }

  async setUserInfo() {
    const isValidUser = await isLoggedIn();
    if (!isValidUser) return;
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    if (!this.isWorking) {
      this.isWorking = await this.store.getUserIsWorking();
    }

    this.PersonalDetails = new PersonalDetails();
    this.PersonalInfo = new PersonalInfo({
      member: this.user,
      isWorking: this.isWorking,
    });
  }

  async render() {
    await this.setUserInfo();

    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
      <div class='logout-btn-wrapper-inprofile'>
        ${this.Button.html()}
      </div>
    `;

    this.PersonalDetails.render(this.user);
    this.PersonalInfo.render();

    document
      .querySelector('.logout-btn-wrapper-inprofile button')
      .addEventListener('click', logout);
  }
}
