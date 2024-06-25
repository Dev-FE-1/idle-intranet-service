import Main from '../../components/Main';
import './WorkManage.css';

export default class WorkManagePage extends Main {
  render() {
    this.$container.innerHTML = `
        <h1>근무/휴가</h1>
    `;
  }
}
