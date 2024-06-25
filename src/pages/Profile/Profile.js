import Main from '../../components/Main';
import './Profile.css';

export default class ProfilePage extends Main {
  render() {
    this.$container.innerHTML = `
        <h1>프로필</h1>
    `;
  }
}
