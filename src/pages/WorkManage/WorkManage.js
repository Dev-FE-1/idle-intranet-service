import Main from '../../components/Main';
import Title from '../../components/Title/Title';
import { MENUS } from '../../utils/constants';
import './WorkManage.css';

export default class WorkManagePage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: MENUS.WORK_MANAGE,
    });
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
    `;
  }
}
