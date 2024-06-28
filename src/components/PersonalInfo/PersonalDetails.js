import PersonalDetail from './PersonalDetail';
import './PersonalDetails.css';

export default class PersonalDetails {
  constructor({ user }) {
    this.user = user;
    this.isAdmin = user.isAdmin;
    this.isOwner = true; // 임시
    this.personalInfo = [];
    this.privateInfo = [];
    this.employmentInfo = [];
    this.educationAndCareerInfo = [];
    this.setInfoArray();
  }

  setInfoArray() {
    this.personalInfo = [
      { subtitle: '조직', contents: '검색시스템개발팀' }, // 임시
      { subtitle: '직책', contents: this.user.role },
    ];

    this.privateInfo = [
      { subtitle: '이메일', contents: this.user.email },
      { subtitle: '전화번호', contents: this.user.phoneNumber },
    ];

    if (this.isAdmin || this.isOwner) {
      this.privateInfo.unshift({
        subtitle: '생년월일',
        contents: this.user.birthDate,
      });

      this.privateInfo.push({
        subtitle: '자택 주소',
        contents: this.user.address,
      });

      this.employmentInfo = [
        { subtitle: '입사일', contents: this.user.hireDate },
        { subtitle: '근무유형', contents: '정규직' }, // 임시
      ];

      this.educationAndCareerInfo = [
        { subtitle: '학력', contents: this.user.education },
        {
          subtitle: '경력',
          contents: `<ul class="career-list">
            ${
              this.user.career.length
                ? this.user.career
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

    if (this.isAdmin) {
      this.employmentInfo.push({
        subtitle: '연봉',
        contents: this.user.salary.toLocaleString('en-US'),
      });
    }
  }

  html() {
    return `
      <section class="personal-details-section">
        <ul class="personal-details-list">
          ${new PersonalDetail({ title: '인사정보', info: this.personalInfo }).html()}
          ${new PersonalDetail({ title: '개인정보', info: this.privateInfo }).html()}
          ${new PersonalDetail({ title: '고용정보', info: this.employmentInfo }).html()}
          ${new PersonalDetail({ title: '학력/경력', info: this.educationAndCareerInfo }).html()}
        </ul>
      </section>
    `;
  }
}
