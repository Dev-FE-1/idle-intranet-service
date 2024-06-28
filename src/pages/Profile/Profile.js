import Main from '../../components/Main';
import PersonalDetails from '../../components/PersonalInfo/PersonalDetails';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Title from '../../components/Title/Title';
import { MENUS } from '../../utils/constants';
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
      title: MENUS.PROFILE,
      desktopOnly: true,
    });
    this.PersonalInfo = new PersonalInfo({ user: dummyUserProfile });
    this.PersonalDetails = new PersonalDetails({ user: dummyUserProfile });
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
    `;
  }
}
