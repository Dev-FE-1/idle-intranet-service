import { vacationArray } from '../../../utils/vacation.js';
import './VacationHistory.css';

export default class VacationHistory {
  constructor(VacationHistoryData) {
    this.vacationHistoryData = VacationHistoryData;
  }

  // eslint-disable-next-line class-methods-use-this
  getIcon(vacationType) {
    const vacation = vacationArray.find((v) => v.type === vacationType);
    return vacation ? vacation.icon : '';
  }

  html() {
    const icon = this.getIcon(this.vacationHistoryData.vacationType);
    return /* HTML */ `
      <li class="vacation-history">
        <div class="vacation-history-container">
          <div class="vacation-history-type-box">
            <div class="vacation-history-type-icon-box">
              <span class="vacation-history-type-icon">${icon}</span>
            </div>
            <p class="vacation-history-type">
              ${this.vacationHistoryData.vacationType}
            </p>
          </div>
          <span class="vacation-history-approval-status">
            ${this.vacationHistoryData.approvalStatus}
          </span>
        </div>
        <p class="vacation-application-date">
          ${this.vacationHistoryData.vacationRequestDate}
        </p>
      </li>
    `;
  }
}
