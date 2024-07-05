
import Container from '../../components/Container.js';
import notFoundImage from '../../../public/images/404.png';
import './PageNotFound.css';

export default class PageNotFound extends Container {
  constructor() {
    super('#app');
  }

  render() {
    this.$container.innerHTML = /* HTML */ `
      <div class="not-found-container">
        <div class="wrapper">
          <img class="not-found-image" src=${notFoundImage} alt="404" />
          <h1 class="not-found-title">페이지를 찾을 수 없습니다</h1>
          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
          <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
          <a class="home-link" href="/">홈으로 이동</a>
        </div>
      </div>
    `;
  }
}
