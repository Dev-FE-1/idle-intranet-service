import Button from '../Button/Button.js';
import Icon from '../Icon/Icon.js';
import ProgressRing from '../ProgressRing.js/ProgressRing.js';
import { COLORS } from '../../utils/constants.js';
import { clockIcon } from '../../utils/icons.js';
import './WorkInfo.css';

export default class WorkInfo {
  constructor() {
    this.weeklyWorkHours = 32;
    this.Icon = new Icon({
      svg: clockIcon,
      options: { color: COLORS.DARK_GRAY },
    });
    this.ProgressRing = new ProgressRing({ percent: 50 });
    this.Button = new Button({
      type: 'secondary',
      size: 'large',
      content: '근무 시작',
    });
  }

  html() {
    return `
      <div class="work-info-container">
        <div class="work-info weekly-work-hours">
          ${this.Icon.html()}
          <div class="weekly-work-hours-title">이번 주 근무 시간</div>
          <strong class="weekly-work-hours-time">${this.weeklyWorkHours}시간</strong>
          ${this.ProgressRing.html()}
        </div>
        <div class="work-info daily-work-hours">
          <ul class="work-hours-list">
            <li>
              <div class="work-hour-title">현재 시각</div>
              <time class="work-hour-time" datetime="07:06">07:06</time>
            </li>
            <li>
              <div class="work-hour-title">근무 시작</div>
              <time class="work-hour-time" datetime="">-</time>
            </li>
            <li>
              <div class="work-hour-title">근무 종료</div>
              <time class="work-hour-time" datetime="">-</time>
            </li>
          </ul>
          <div class="work-hours-button-container" type="button">
            ${this.Button.html()}
          </div>
        </div>
      </div>
    `;
  }
}
