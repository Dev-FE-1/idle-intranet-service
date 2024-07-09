import { isLoggedIn } from '../../components/API/AuthService.js';
import { getMemberById } from '../../components/API/MemberService.js';
import Container from '../../components/Container.js';
import PersonalDetails from '../../components/PersonalInfo/PersonalDetails.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import { storeInstance } from '../../components/Store.js';
import Title from '../../components/Title/Title.js';
import { PATH_TITLE } from '../../utils/constants.js';

export default class ProfileSpecPage extends Container {
  constructor() {
    super('#main');
    this.store = storeInstance;
    this.Title = new Title({
      title: PATH_TITLE.MEMBERS,
      desktopOnly: true,
    });
    this.store = storeInstance;
  }

  async setUserInfo() {
    const isValidUser = await isLoggedIn();
    if (!isValidUser) return;
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    const pathParts = window.location.pathname.split('/');
    this.employeeNumber = pathParts[pathParts.length - 1];
    const isOwner = this.user.employeeNumber === this.employeeNumber;
    try {
      this.member = await getMemberById(
        this.employeeNumber,
        this.user.isAdmin,
        isOwner,
      );
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }

    this.PersonalDetails = new PersonalDetails();
    this.PersonalInfo = new PersonalInfo({
      member: this.member,
      isWorking: null,
    });
  }

  async render() {
    await this.setUserInfo();

    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
    `;

    this.PersonalDetails.render(this.member);
    this.PersonalInfo.render();
  }
}
