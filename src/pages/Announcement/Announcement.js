import Container from '../../components/Container.js';
import { fetchAnnouncement } from '../../api/endpoints/announcement.js';
import './Announcement.css';
import { fetchMember } from '../../api/endpoints/member.js';
import Icon from '../../components/Icon/Icon.js';
import IconButton from '../../components/Button/IconButton.js';
import { chevronLeft } from '../../utils/icons.js';
import { COLORS } from '../../utils/constants.js';

export default class AnnouncementPage extends Container {
  constructor() {
    super('#main');
    this.announcement = null;
    this.Icon = new Icon({
      svg: chevronLeft,
      options: { color: COLORS.DARKEST_GRAY },
    });
    this.IconButton = new IconButton({ icon: this.Icon });
  }

  async setAnnouncement() {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    this.announcement = await fetchAnnouncement(id);
  }

  async getMember() {
    this.member = await fetchMember(this.announcement.employeeNumber);
    console.log(this.member);
  }

  async render() {
    await this.setAnnouncement();
    await this.getMember();

    this.$container.innerHTML = /* HTML */ `
      <div class="announcement-page-container">
        <div class="back-button-container">${this.IconButton.html()}</div>
        <h1 class="announcement-title">${this.announcement.title}</h1>
        <div class="announcement-department">
          ${this.member.name} | ${this.announcement.postedDate}
        </div>
        <img
          class="announcement-image"
          src="..${this.announcement.imageUrl}"
          alt="Announcement Image"
        />
        <p class="announcement-content">
          ${this.announcement.content.replaceAll('\n', '<br />')}
        </p>
      </div>
    `;
    document
      .querySelector('.back-button-container button')
      .addEventListener('click', () => {
        window.history.back();
      });
  }
}
