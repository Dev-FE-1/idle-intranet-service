import Main from '../../components/Main';
import './Members.css';

export default class MembersPage extends Main {
  render() {
    this.$container.innerHTML = `
        <h1>구성원</h1>
    `;
  }
}
