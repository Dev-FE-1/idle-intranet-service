import Main from '../../components/Main';
import './Home.css';

export default class HomePage extends Main {
  render() {
    this.$container.innerHTML = `
        <h1>홈</h1>
    `;
  }
}
