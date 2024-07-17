import './Avatar.css';

export default class Avatar {
  constructor({ url, size = 'default', border = 'default' }) {
    // 기본값 매개변수 사용해보기
    this.url = url;
    this.size = size;
    this.border = border;
  }

  html() {
    return `
      <div class='profile-img-container img-${this.size} img-bd-${this.border}'>
        <img src=${this.url} alt="프로필 사진" class="profile-img img-${this.size}"/>
      </div>
    `;
  }
}
