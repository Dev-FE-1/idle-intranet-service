import './Calendar.css';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import IconButton from '../Button/IconButton.js';
import { chevronLeft, chevronRight } from '../../utils/icons.js';
import { COLORS } from '../../utils/constants.js';
import Icon from '../Icon/Icon.js';

dayjs.extend(isSameOrAfter);

export default class Calendar {
  constructor(selectedDate) {
    this.currentMonth = dayjs();
    this.selectedDate = selectedDate;
    this.chevronLeft = new Icon({
      svg: chevronLeft,
      options: { color: COLORS.LIGHT_GRAY },
    });
    this.chevronRight = new Icon({
      svg: chevronRight,
      options: { color: COLORS.DARKEST_GRAY },
    });
    this.leftButton = new IconButton({ icon: this.chevronLeft });
    this.rightButton = new IconButton({ icon: this.chevronRight });
  }

  renderGenerateCalendar(month = this.currentMonth) {
    const today = dayjs();
    const startDay = month.startOf('month').day();
    const daysInMonth = month.daysInMonth();
    let calendarBodyHtml = '<tr>';

    calendarBodyHtml += Array(startDay)
      .fill('<td class="empty-date"></td>')
      .join('');

    Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayDate = month.date(day);
      const fullDate = dayDate.format('YYYY-MM-DD');
      const isPast = dayDate.isBefore(today, 'day');
      const isSelected =
        this.selectedDate && dayjs(this.selectedDate).isSame(dayDate, 'day');
      const isWeekend = dayDate.day() === 0 || dayDate.day() === 6;
      const classes = `${isPast || isWeekend ? 'disabled-date' : 'calendar-td'} ${isSelected ? 'selected-date' : ''} ${today.isSame(dayDate, 'day') ? 'today-date' : ''}`;

      calendarBodyHtml += `<td id="${fullDate}" class="${classes}">${day}</td>`;
      if ((day + startDay - 1) % 7 === 6 && day !== daysInMonth) {
        calendarBodyHtml += '</tr><tr>';
      }
    });

    if ((daysInMonth + startDay) % 7 !== 0) {
      calendarBodyHtml += Array(7 - ((daysInMonth + startDay) % 7))
        .fill('<td class="empty-date"></td>')
        .join('');
    }

    calendarBodyHtml += '</tr>';
    document.querySelector('.calendar-table tbody').innerHTML =
      calendarBodyHtml;
    this.updateMonthYearDisplay(month);
  }

  // eslint-disable-next-line class-methods-use-this
  updateMonthYearDisplay(month) {
    const displayText = month.format('YYYY년 MM월');
    document.querySelector('.month-year-display').innerText = displayText;
  }

  selectDate(date) {
    const selectedElement = document.getElementById(date);
    if (!selectedElement || selectedElement.classList.contains('disabled-date'))
      return;

    this.resetSelection();
    this.selectedDate = date;
    selectedElement.classList.add('selected-date');
    document.dispatchEvent(
      new CustomEvent('dateSelected', { detail: { selectedDate: date } }),
    );

    this.closeCalendar();
  }

  // eslint-disable-next-line class-methods-use-this
  closeCalendar() {
    const $calendarContainer = document.querySelector('.calendar-container');
    if ($calendarContainer) {
      $calendarContainer.classList.remove('active');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  resetSelection() {
    const allDates = document.querySelectorAll('.calendar-td');
    allDates.forEach((td) => td.classList.remove('selected-date'));
  }

  changeMonth(step) {
    const newMonth = this.currentMonth.add(step, 'month');
    if (
      step > 0 ||
      (step < 0 && newMonth.isSameOrAfter(this.todayMonth, 'month'))
    ) {
      this.currentMonth = newMonth;
      this.renderGenerateCalendar(this.currentMonth);
      this.updatePreviousMonthButton();
    }
  }

  updatePreviousMonthButton() {
    const isCurrentMonthTodayMonth = this.currentMonth.isSame(
      this.todayMonth,
      'month',
    );
    document.querySelector('#prevMonth').disabled = isCurrentMonthTodayMonth;

    const newColor = isCurrentMonthTodayMonth
      ? COLORS.LIGHT_GRAY
      : COLORS.DARKEST_GRAY;

    this.chevronLeft.color = `${newColor}`;

    document.querySelector('.control-button-container#prevMonth').innerHTML =
      this.leftButton.html();
  }

  addEventListeners() {
    const $prevMonthButton = document.querySelector('#prevMonth');
    $prevMonthButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.changeMonth(-1);
    });

    const $nextMonthButton = document.querySelector('#nextMonth');
    $nextMonthButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.changeMonth(1);
    });

    document
      .querySelector('.calendar-table tbody')
      .addEventListener('click', (event) => {
        if (
          event.target.classList.contains('calendar-td') &&
          !event.target.classList.contains('disabled-date')
        ) {
          this.selectDate(event.target.id);
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  html() {
    return /* HTML */ `
      <div class="calendar-content">
        <div class="calendar-header">
          <div class="month-year-display" id="monthYearDisplay"></div>
          <div class="control-buttons">
            <div class="control-button-container" id="prevMonth">
              ${this.leftButton.html()}
            </div>
            <div class="control-button-container" id="nextMonth">
              ${this.rightButton.html()}
            </div>
          </div>
        </div>
        <div id="calendar">
          <table class="calendar-table">
            <thead>
              <tr>
                <th class="calendar-th">일</th>
                <th class="calendar-th">월</th>
                <th class="calendar-th">화</th>
                <th class="calendar-th">수</th>
                <th class="calendar-th">목</th>
                <th class="calendar-th">금</th>
                <th class="calendar-th">토</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `;
  }
}
