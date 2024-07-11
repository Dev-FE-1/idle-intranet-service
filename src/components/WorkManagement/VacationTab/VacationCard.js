import { chevronRight } from '../../../utils/icons.js';
import { COLORS } from '../../../utils/constants.js';
import Icon from '../../Icon/Icon.js';
import './VacationCard.css';

export default class VacationCard {
  constructor(vacationData) {
    this.vacationData = vacationData;
    this.chevronRight = new Icon({
      svg: chevronRight,
      options: { size: '24px', color: COLORS.DARK_GRAY },
    });
  }

  html() {
    return /* HTML */ `
      <li class="vacation-card">
        <div class="vacation-card-type-box">
          <div class="vacation-card-icon">${this.vacationData.icon}</div>
          <p class="vacation-card-type">${this.vacationData.type}</p>
        </div>
        <div class="vacation-card-info-box">
          <p class="vacation-card-days">${this.vacationData.days}</p>
          <div class="next-arrow-icon">${this.chevronRight.html()}</div>
        </div>
      </li>
    `;
  }
}
