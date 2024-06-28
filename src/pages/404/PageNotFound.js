import Main from '../../components/Main';
import './PageNotFound.css';

export default class PageNotFound extends Main {
  render() {
    this.$container.innerHTML = `
      <h1>404</h1>
      <p>존재하지 않는 페이지입니다.</p>
      <a href="/">처음으로 돌아가기</a>
    `;
  }
}
