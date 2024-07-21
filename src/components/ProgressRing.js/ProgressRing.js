import './ProgressRing.css';

export default class ProgressRing {
  constructor({ percent = 0 }) {
    this.dashoffset = 100 - percent;
  }

  html() {
    return `
      <div class="progress-ring">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            class="progress-bg"
            cx="20"
            cy="20"
            r="16"
            stroke-width="6"
          />
          <circle
            class="progress-ing"
            cx="20"
            cy="20"
            r="16"
            stroke-width="6"
            stroke-dashoffset="${this.dashoffset}"
          />
        </svg>
      </div>
    `;
  }
}
