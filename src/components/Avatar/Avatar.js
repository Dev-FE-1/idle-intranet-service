import './Avatar.css';

export default class Avatar {
  constructor({ url, size, border }) {
    this.url = url;
    this.size = size || 'default'; // default, large
    this.border = border || 'default'; // default, light
  }

  html() {
    return `
      <div class='profile-img-container img-${this.size} img-bd-${this.border}'>
        <img src=${this.url} alt="프로필 사진" class="profile-img img-${this.size}"/>
      </div>
    `;
  }
}
