import Main from '../../components/Main';
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
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
    `;
  }
}
