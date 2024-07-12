import Container from '../../components/Container.js';
import { fetchAnnouncement } from '../../api/endpoints/announcement.js';
import './Announcement.css';
import { fetchMember } from '../../api/endpoints/member.js';
import Icon from '../../components/Icon/Icon.js';
import { chevronLeft } from '../../utils/icons.js';
import { COLORS } from '../../utils/constants.js';

export default class AnnouncementPage extends Container {
  constructor() {
    super('#main');
    this.announcement = null;
    this.Icon = new Icon({
      svg: chevronLeft,
      options: {
        color: COLORS.DARKEST_GRAY,
        size: '1.4rem',
      },
    });
  }

  async setAnnouncement() {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    this.announcement = await fetchAnnouncement(id);
  }

  async setMember() {
    this.member = await fetchMember(this.announcement.employeeNumber);
  }

  async render() {
    await this.setAnnouncement();
    await this.setMember();

    this.$container.innerHTML = /* HTML */ `
      <div class="announcement-page-container">
        <header class="announcement-mobile-header">
          <button>${this.Icon.html()}</button>
        </header>
        <div class="wrapper">
          <h1 class="announcement-title">${this.announcement.title}</h1>
          <div class="announcement-department">
            ${this.member.name} | ${this.announcement.postedDate}
          </div>
        </div>
        <img
          class="announcement-image"
          src="..${this.announcement.imageUrl}"
          alt="Announcement Image"
        />
        <div class="wrapper">
          <p class="announcement-content">
            ${this.announcement.content.replaceAll('\n', '<br />')}
          </p>
        </div>
      </div>
    `;

    const backButton = document.querySelector(
      '.announcement-mobile-header button',
    );
    backButton.addEventListener('click', () => {
      window.history.back();
    });
  }
}
