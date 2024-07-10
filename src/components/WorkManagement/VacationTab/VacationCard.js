import { chevronRight } from '../../../utils/icons.js';
import { COLORS } from '../../../utils/constants.js';
import Icon from '../../Icon/Icon.js';
import './VacationCard.css';

export default class VacationCard {
  constructor({ vacationData }) {
    if (!vacationData) throw new Error('vacationData is required');

    this.vacationData = vacationData;
    this.chevronRight = new Icon({
      svg: chevronRight,
      options: { size: '24px', color: COLORS.DARK_GRAY },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createIconHtml(icon) {
    return `<div class="vacation-card-icon">${icon}</div>`;
  }

  html() {
    const { icon, type, days } = this.vacationData;
    const chevronHtml = this.chevronRight.html();

    return `
      <li class="vacation-card">
        <div class="vacation-card-type-box">
          ${this.createIconHtml(icon)}
          <p class="vacation-card-type">${type}</p>
        </div>
        <div class="vacation-card-info-box">
          <p class="vacation-card-days">${days}</p>
          <div class="next-arrow-icon">${chevronHtml}</div>
        </div>
      </li>
    `;
  }
}
