import AuthService from '../../components/API/AuthService.js';
import Button from '../../components/Button/Button.js';
import Container from '../../components/Container.js';
import PersonalDetails from '../../components/PersonalInfo/PersonalDetails.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import Title from '../../components/Title/Title.js';
import { PATH_TITLE } from '../../utils/constants.js';
import './Profile.css';

export default class ProfilePage extends Container {
  constructor() {
    super('#main');
    this.Title = new Title({
      title: PATH_TITLE.PROFILE,
      desktopOnly: true,
    });
    this.PersonalInfo = new PersonalInfo();
    this.PersonalDetails = new PersonalDetails();
    this.timeout = null;
    this.timer = null;
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
    });
    this.handleLogout = new AuthService().logout;
  }

  renderCurrentTime() {
    this.PersonalInfo.updateTime();

    if (!this.timer) {
      const delay = this.PersonalInfo.getNextUpdateDelay();

      const updateNextTime = () => {
        this.PersonalInfo.updateTime();
        const nextDelay = this.PersonalInfo.getNextUpdateDelay();
        this.timer = setTimeout(updateNextTime, nextDelay);
      };

      this.timeout = setTimeout(updateNextTime, delay);
    }
  }

  cleanUp() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
      <div class='logout-btn-wrapper'>
        ${this.Button.html()}
      </div>
    `;

    this.renderCurrentTime();
    this.PersonalInfo.render();
    this.PersonalDetails.render();
    document
      .querySelector('.logout-btn-wrapper button')
      .addEventListener('click', this.handleLogout);
  }
}
