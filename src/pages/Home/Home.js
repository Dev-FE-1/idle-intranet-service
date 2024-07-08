import Container from '../../components/Container.js';
import Title from '../../components/Title/Title.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import logo from '../../../public/images/logo.svg';
import GalleryItem from '../../components/Announcements/GalleryItem.js';
import TextItem from '../../components/Announcements/TextItem.js';
import { fetchAnnouncements } from '../../api/endpoints/announcement.js';
import './Home.css';

export default class HomePage extends Container {
  constructor() {
    super('#main');
    this.Title = new Title({
      title: '작은 큐브가 만드는 큰 변화, Cube.IT',
      subtitle: 'VISION & MISSION',
      description:
        'Cube.IT은 작은 아이디어로 큰 변화를 만들어갑니다. 혁신적인 큐브의 힘을 경험해 보세요.',
    });
    this.PersonalInfo = new PersonalInfo();
  }

  async setAnnouncements() {
    this.announcements = await fetchAnnouncements();
    this.galleryAnnouncements = this.announcements.filter(
      (announcement) => announcement.imageUrl,
    );
    this.textAnnouncements = this.announcements.filter(
      (announcement) => !announcement.imageUrl,
    );
  }

  async renderGalleryAnnouncements() {
    const $gallery = document.querySelector('.home-container .gallery');

    if (!this.announcements) {
      await this.setAnnouncements();
    }

    $gallery.innerHTML = this.galleryAnnouncements
      .map((announcement) => new GalleryItem(announcement).html())
      .join('');
  }

  async renderTextAnnouncements() {
    const $container = document.querySelector(
      '.home-container .announcement-contents',
    );

    if (!this.announcements) {
      await this.setAnnouncements();
    }

    const textItems = [];

    $container.innerHTML = this.textAnnouncements
      .map((announcement) => {
        const textItem = new TextItem(announcement);
        textItems.push(textItem);
        return textItem.html();
      })
      .join('');

    textItems.forEach((item) => item.render());
  }

  render() {
    this.$container.innerHTML = /* HTML */ `
      <div class="home-container">
        <header class="home-mobile-header mobile-only">
          <div class="logo-container">
            <div class="logo">
              <img src=${logo} alt="" />
            </div>
            <strong class="logo-title">Cube.IT</strong>
          </div>
          <ul class="menu-list"></ul>
        </header>

        ${this.Title.html()}

        <div class="my-info desktop-only">
          <div class="wrapper">
            <h2 class="home-subtitle">내 정보</h2>
          </div>
          ${this.PersonalInfo.html()}
        </div>

        <section class="gallery-section">
          <div class="wrapper">
            <h2 class="home-subtitle">공지사항 갤러리</h2>
            <ul class="gallery"></ul>
          </div>
        </section>

        <section class="announcement-container">
          <div class="wrapper">
            <h2 class="home-subtitle">주요 소식</h2>
            <ul class="announcement-contents"></ul>
          </div>
        </section>
      </div>
    `;

    this.PersonalInfo.render();
    this.renderGalleryAnnouncements();
    this.renderTextAnnouncements();
  }
}
