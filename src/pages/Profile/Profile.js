import Main from '../../components/Main';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Title from '../../components/Title/Title';
import { MENUS } from '../../utils/constants';
import './Profile.css';

export default class ProfilePage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: MENUS.PROFILE,
      desktopOnly: true,
    });
    this.PersonalInfo = new PersonalInfo();
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
    `;
  }
}
