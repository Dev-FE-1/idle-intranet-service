import { logout } from '../../components/API/AuthService.js';
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
    this.PersonalInfo = new PersonalInfo();
    this.PersonalDetails = new PersonalDetails();
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
    });
  }

  async renderPersonalDetails() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    this.PersonalDetails.render(this.user);
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
      <div class='logout-btn-wrapper-inprofile'>
        ${this.Button.html()}
      </div>
    `;

    this.PersonalInfo.render();
    this.renderPersonalDetails();
    document
      .querySelector('.logout-btn-wrapper-inprofile button')
      .addEventListener('click', logout);
  }
}
