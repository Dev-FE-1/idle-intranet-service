import PersonalDetail from './PersonalDetail.js';
import './PersonalDetails.css';
import { storeInstance } from '../Store.js';
import { sortByPeriod } from '../../utils/sortByPeriod.js';

export default class PersonalDetails {
  constructor() {
    this.store = storeInstance;
    this.personalInfo = [];
    this.privateInfo = [];
    this.employmentInfo = [];
    this.educationAndCareerInfo = [];
  }

  setInfoArray() {
    this.personalInfo = [
      { subtitle: '조직', contents: this.member.departmentName },
      { subtitle: '직책', contents: this.member.role },
    ];

    this.privateInfo = [
      { subtitle: '이메일', contents: this.member.email },
      { subtitle: '전화번호', contents: this.member.phoneNumber },
    ];

    if (this.isAdmin || this.isOwner) {
      this.privateInfo.unshift({
        subtitle: '생년월일',
        contents: this.member.birthDate,
      });

      this.privateInfo.push({
        subtitle: '자택 주소',
        contents: this.member.address,
      });

      this.employmentInfo = [
        { subtitle: '입사일', contents: this.member.hireDate },
        { subtitle: '근무유형', contents: this.member.employmentType },
      ];

      const careers = JSON.parse(this.member.career);
      careers.sort(sortByPeriod);
      this.educationAndCareerInfo = [
        { subtitle: '학력', contents: this.member.education },
        {
          subtitle: '경력',
          contents: `<ul class="career-list">
            ${
              careers.length
                ? careers
                    .map(
                      (career) => `
                        <li>
                          <strong class="career-company">${career.companyName}</strong>
                          <div class="career-period">(${career.period})</div>
                          <div class="career-role">${career.role}</div>
                        </li>
                      `,
                    )
                    .join('')
                : '<li>없음</li>'
            }
          </ul>`,
        },
      ];
    }

    if (this.isAdmin && this.member.salary) {
      this.employmentInfo.push({
        subtitle: '연봉',
        contents: this.member.salary.toLocaleString('en-US'),
      });
    }
  }

  renderPersonalDetails() {
    const $container = document.querySelector('.personal-details-list');
    $container.innerHTML = `
      ${new PersonalDetail({ title: '인사정보', info: this.personalInfo }).html()}
      ${new PersonalDetail({ title: '개인정보', info: this.privateInfo }).html()}
      ${new PersonalDetail({ title: '고용정보', info: this.employmentInfo }).html()}
      ${new PersonalDetail({ title: '학력/경력', info: this.educationAndCareerInfo }).html()}
    `;
  }

  async render(member) {
    this.user = await this.store.getUser();
    this.member = member;
    this.isAdmin = !!this.user.isAdmin;
    this.isOwner = this.member.employeeNumber === this.user.employeeNumber;
    this.setInfoArray();
    this.renderPersonalDetails();
  }

  html() {
    return `
      <section class="personal-details-section">
        <ul class="personal-details-list"></ul>
      </section>
    `;
  }
}
