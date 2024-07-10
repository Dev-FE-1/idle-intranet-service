import Container from '../../components/Container.js';
import { fetchAnnouncement } from '../../api/endpoints/announcement.js';
import './Announcement.css';

export default class AnnouncementPage extends Container {
  constructor() {
    super('#main');
  }

  async setAnnouncement() {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    this.announcement = await fetchAnnouncement(id);
  }

  async render() {
    await this.setAnnouncement();
    this.$container.innerHTML = /* HTML */ `
      <div class="announcement-page-container"></div>
    `;
  }
}
