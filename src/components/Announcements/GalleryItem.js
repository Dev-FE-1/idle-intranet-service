import { PATH } from '../../utils/constants.js';

export default class GalleryItem {
  constructor(item) {
    this.item = item;
  }

  html() {
    return /* HTML */ `
      <li class="gallery-item">
        <a href="${PATH.ANNOUNCEMENTS}/${this.item.announcementId}">
          <div class="gallery-image-box">
            <img src=".${this.item.imageUrl}" alt="${this.item.title}" />
          </div>
          <div class="gallery-content-box">
            <h2>${this.item.title}</h2>
            <p class="gallery-content">${this.item.content}</p>
          </div>
        </a>
      </li>
    `;
  }
}
