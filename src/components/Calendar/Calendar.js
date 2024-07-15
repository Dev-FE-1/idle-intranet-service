import dayjs from 'dayjs';

export default class Calendar {
  constructor(containerId, selectedCallback) {
    this.container = document.getElementById(containerId);
    this.selectedCallback = selectedCallback;
    this.currentDate = dayjs();
  }

  render() {
    this.container.innerHTML = this.html();
    this.attachEventListeners();
  }

  html() {
    let html = `<div class="calendar-header">
                  <button id="prevMonth">&lt;</button>
                  <span>${this.currentDate.format('YYYY년 MM월')}</span>
                  <button id="nextMonth">&gt;</button>
                </div>`;
    const startDay = this.currentDate.startOf('month').day();
    const numDays = this.currentDate.daysInMonth();
    for (let i = 0; i < startDay; i += +1) {
      html += '<div class="calendar-day"></div>';
    }
    for (let i = 1; i <= numDays; i += +1) {
      const dayClass = this.currentDate.date(i).isBefore(dayjs(), 'day')
        ? 'disabled'
        : '';
      html += `<div class="calendar-day ${dayClass}" data-day="${i}">${i}</div>`;
    }
    return html;
  }

  attachEventListeners() {
    document.getElementById('prevMonth').addEventListener('click', () => {
      this.update(this.currentDate.subtract(1, 'month'));
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
      this.update(this.currentDate.add(1, 'month'));
    });
    this.container
      .querySelectorAll('.calendar-day:not(.disabled)')
      .forEach((day) => {
        day.addEventListener('click', () => {
          if (this.selectedCallback) {
            this.selectedCallback(
              this.currentDate.date(day.dataset.day).format('YYYY/MM/DD'),
            );
          }
        });
      });
  }

  update(newDate) {
    this.currentDate = newDate;
    this.render();
  }
}
