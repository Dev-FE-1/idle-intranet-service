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
      `#announcement-${this.item.announcementId}`,
    );
    const $avatar = $container.querySelector('.author-image-container');
    const $name = $container.querySelector('.announcement-author-name');

    $avatar.innerHTML = new Avatar({
      url: this.author.profileImage,
    }).html();
    $name.innerText = this.author.name;
  }

  render() {
    this.renderAuthor();
  }

  html() {
    const postedDate = this.item.postedDate.split('-').slice(1).join('/');

    return /* HTML */ `
      <li id="announcement-${this.item.announcementId}">
        <div class="announcement-author">
          <div class="author-image-container"></div>
          <div class="announcement-info">
            <div class="announcement-author-name"></div>
            <div class="announcement-time">${postedDate}</div>
          </div>
        </div>
        <div class="announcement-content">
          <p>${this.item.content.replaceAll('\n', '<br />')}</p>
        </div>
      </li>
    `;
  }
}
