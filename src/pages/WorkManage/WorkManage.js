import Container from '../../components/Container.js';
import Title from '../../components/Title/Title.js';
import { PATH_TITLE } from '../../utils/constants.js';
import './WorkManage.css';

export default class WorkManagePage extends Container {
  constructor() {
    super('#main');
    this.Title = new Title({
      title: PATH_TITLE.WORK_MANAGE,
    });
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
    `;
  }
}
