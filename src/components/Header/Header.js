import './Header.css';

export default class Header {
  constructor({ container, user }) {
    this.$container = document.querySelector(container);
    this.profileImage = user && user.profileImage;
    this.userName = user && user.name;
    this.render();
  }

  render() {
    this.$container.innerHTML = `
      <div class="wrapper">
        <div class="header-profile">
          <img
            class="header-profile-image"
            src="${this.profileImage || 'https://api.dicebear.com/9.x/lorelei/svg?seed=Max&eyes=variant09'}"
            alt="${this.userName || '김직원'}"
          />
        </div>
      </div>
    `;
  }
}
