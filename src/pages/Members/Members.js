import Main from '../../components/Main';
import Title from '../../components/Title/Title';
import { MENUS } from '../../utils/constants';
import './Members.css';

export default class MembersPage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: MENUS.MEMBERS,
    });
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
    `;
  }
}
