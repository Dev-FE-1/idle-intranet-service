import AuthService from '../../components/Auth/AuthService.js';
import Button from '../../components/Button/Button.js';
import Main from '../../components/Main.js';
import PersonalDetails from '../../components/PersonalInfo/PersonalDetails.js';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.js';
import Title from '../../components/Title/Title.js';
import { PATH_TITLE } from '../../utils/constants.js';
import './Profile.css';

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

export default class ProfilePage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: PATH_TITLE.PROFILE,
      desktopOnly: true,
    });
    this.PersonalInfo = new PersonalInfo({ user: dummyUserProfile });
    this.PersonalDetails = new PersonalDetails({ user: dummyUserProfile });
    this.timeout = null;
    this.timer = null;
    this.Button = new Button({
      variant: 'tertiary',
      content: '로그아웃',
    });
    this.handleLogout = new AuthService().logout;
  }

  renderCurrentTime() {
    this.PersonalInfo.updateTime();

    if (!this.timer) {
      const delay = this.PersonalInfo.getNextUpdateDelay();

      const updateNextTime = () => {
        this.PersonalInfo.updateTime();
        const nextDelay = this.PersonalInfo.getNextUpdateDelay();
        this.timer = setTimeout(updateNextTime, nextDelay);
      };

      this.timeout = setTimeout(updateNextTime, delay);
    }
  }

  cleanUp() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
      <div class='logout-btn-wrapper'>
        ${this.Button.html()}
      </div>
    `;

    this.renderCurrentTime();
    document
      .querySelector('.logout-btn-wrapper button')
      .addEventListener('click', this.handleLogout);
  }
}
