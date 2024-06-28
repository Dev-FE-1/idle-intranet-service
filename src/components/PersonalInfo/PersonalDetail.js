export default class PersonalDetail {
  constructor({ title, info }) {
    this.title = title;
    this.info = info;
  }

  html() {
    return `
      <li>
        <div class="wrapper">
          <h2 class="personal-detail-title">${this.title}</h2>
          <ul class="personal-detail-list">
            ${
              this.info.length
                ? this.info
                    .map(
                      (detail) => `
                        <li>
                          <h3 class="personal-detail-subtitle">${detail.subtitle}</h3>
                          <span class="personal-detail-info">${detail.contents}</span>
                        </li>
                      `,
                    )
                    .join('')
                : '<li class="admin-owner-only">본인 혹은 관리자만 열람할 수 있습니다.</li>'
            }
          </ul>
        </div>
      </li>
    `;
  }
}
