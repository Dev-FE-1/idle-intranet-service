import { fetchMember } from '../../api/endpoints/member.js';
import Avatar from '../Avatar/Avatar.js';

export default class TextItem {
  constructor(item) {
    this.item = item;
    this.author = null;
  }

  async renderAuthor() {
    if (!this.author) {
      this.author = await fetchMember(this.item.employeeNumber);
    }

    const $container = document.querySelector(
      `#announcement-${this.item.announcementId} .author-image-container`,
    );
    $container.innerHTML = new Avatar({ url: this.author.profileImage }).html();
  }

  render() {
    this.renderAuthor();
  }

  html() {
    return /* HTML */ `
      <li id="announcement-${this.item.announcementId}">
        <div class="announcement-author">
          <div class="author-image-container"></div>
          <div class="announcement-info">
            <div class="announcement-author-name">안민지</div>
            <div class="announcement-time">약 15시간 전</div>
          </div>
        </div>
        <div class="announcement-content">
          <p>${this.item.content.replaceAll('\n', '<br />')}</p>
        </div>
      </li>
    `;
  }
}
