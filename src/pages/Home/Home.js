import axios from 'axios';

import Main from '../../components/Main.js';
import Title from '../../components/Title/Title.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import Button from '../../components/Button/Button.js';
import './Home.css';
import Icon from '../../components/Icon/Icon.js';
import { COLORS } from '../../utils/constants.js';
import { chevronDown } from '../../utils/icons.js';
import logo from '../../../public/images/logo.svg';

const dummyUserProfile = {
  employeeNumber: 101,
  name: '안민지',
  position: 'Software Engineer',
  hireDate: '2015-10-11',
  birthDate: '1987-05-08',
  address: '경상북도 안산시 단원구 반포대거리',
  email: 'anminji@cubeit.com',
  phoneNumber: '010-7583-2446',
  salary: 69000000,
  isAdmin: true,
  departmentNumber: 20,
  education: '성균관대학교 소프트웨어공학 학사',
  career: [
    {
      companyName: '카카오',
      period: '2012-04-06 ~ 2014-07-02',
      role: '백엔드 개발자',
    },
  ],
  role: '백엔드 개발자',
  profileImage:
    'https://api.dicebear.com/9.x/lorelei/svg?seed=Max&eyes=variant09',
  remainingVacationDays: 11,
};

export default class HomePage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: '작은 큐브가 만드는 큰 변화, Cube.IT',
      subtitle: 'VISION & MISSION',
      description:
        'Cube.IT은 작은 아이디어로 큰 변화를 만들어갑니다. 혁신적인 큐브의 힘을 경험해 보세요.',
    });

    // WorkInfo 객체를 생성
    this.PersonalInfo = new PersonalInfo({ user: dummyUserProfile });

    // 버튼 아이콘
    this.buttonIcon = new Icon({
      svg: chevronDown,
      options: { color: COLORS.DARKEST_GRAY },
    });

    // Button 인스턴스 생성
    this.moreButton = new Button({
      variant: 'tertiary',
      content: `${this.buttonIcon.html()}더 보기`,
    });
  }

  async render() {
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
        <div class="myinfo">내 정보</div>
        ${this.PersonalInfo.html()}

        <div class="gallery-h2">공지사항 갤러리</div>
        <div class="gallery"></div>

        ${this.moreButton.html()}

        <div class="announcement">
          <h2>경영진 공지사항</h2>
          <div class="announcement-content">
            <img src="/public/images/user-default.svg" alt="profile" />
            <div class="announcement-info">
              <p class="admin">최고 관리자</p>
              <p class="time">약 15시간 전</p>
            </div>
          </div>
          <div class="announcement-text">
            <p>
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다. <br />
              오늘은 즐거운 월급날입니다.
            </p>
          </div>
        </div>
      </div>
    `;
    // 공지사항 데이터 가져오기 및 UI 업데이트
    try {
      const response = await axios.get('/api/announcements'); // axios를 사용하여 데이터 가져오기
      const announcements = response.data.data; // 데이터 추출

      this.renderAnnouncements(announcements);
    } catch (error) {
      console.error('공지사항 데이터를 가져오는 중 에러 발생:', error);
    }
  }

  renderAnnouncements(announcements) {
    const galleryElement = this.$container.querySelector('.gallery');

    announcements.forEach((item) => {
      const announcementElement = document.createElement('div');
      announcementElement.classList.add('announcement-item');

      announcementElement.innerHTML = `
          <a href="${item.link}">
            <div class="image-box">
              <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            <div class="content-box">
              <h2>${item.title}</h2>
              <p>${item.content}</p>
            </div>
          </a>
        `;

      galleryElement.appendChild(announcementElement);
    });
  }
}
