import { listVacationDaysWithSuffix } from '../../utils/userVacation.js';
import { vacationArray } from '../../utils/vacation.js';
import Calendar from '../Calendar/Calendar.js';
import Input from '../Input/Input.js';
import Select from '../Select/Select.js';
import { storeInstance } from '../Store.js';
import './VacationForm.css';

export default class VacationForm {
  constructor(vacationDataType) {
    this.store = storeInstance;
    this.vacationDataType = vacationDataType;
    this.initFormInputs();
  }

  async updateVacationList() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    return listVacationDaysWithSuffix(this.user.remainingVacationDays);
  }

  getIcon(vacationType) {
    const vacation = vacationArray.find((v) => v.type === vacationType);
    return vacation ? vacation.icon : '';
  }

  async initFormInputs() {
    this.VacationTypeInput = new Input({
      id: 'vacationType',
      type: 'text',
      value: `${this.getIcon(this.vacationDataType)} ${this.vacationDataType}`,
      readOnly: true,
    });

    const days = await this.updateVacationList();
    this.DaySelect = new Select({
      contents: days,
      onSelect: (selectedItem) => {
        console.log('Selected2:', selectedItem);
        this.selectedVacationDay = selectedItem;
      },
      small: true,
    });

    this.EndDateInput = new Input({
      id: 'endDate',
      type: 'text',
      value: '2024/05/12 (목)',
      readOnly: true,
    });
  }

  toggleCalendar() {
    const calendarEl = document.getElementById('calendarContainer');
    calendarEl.style.display =
      calendarEl.style.display === 'block' ? 'none' : 'block';
  }

  clickCalendar() {
    const $formContainer = document.querySelector(
      '#vacationForm #calendarContainer',
    );
    $formContainer.innerHTML = this.html();
    this.$startDateButton = document.querySelector('.start-date-button');
    this.$startDateButton.addEventListener('click', () =>
      this.toggleCalendar(),
    );
    this.calendar = new Calendar('calendarContainer', (selectedDate) => {
      this.$startDateButton.innerHTML = `📅 ${selectedDate}`;
    });
  }

  render() {
    const $formContainer = document.querySelector('#vacationForm');
    const $startDateButton = document.querySelector('.start-date-button');
    this.clickCalendar();
  }

  html() {
    return /* HTML */ `
      <div class="vacation-form" id="vacationForm">
        <div class="input-field input-readonly">
          <label>휴가 종류</label>
          ${this.VacationTypeInput.html()}
        </div>
        <div class="input-field border">
          <label>시작일</label>
          <button class="start-date-button">📅 0000-00-00(-)</button>
          <div id="calendarContainer"></div>
        </div>
        <div class="input-field border">
          <label>사용기간</label>
          ${this.DaySelect.html()}
        </div>
        <div class="input-field input-readonly">
          <label>종료일</label>
          ${this.EndDateInput.html()}
        </div>
        <div class="input-field">
          <textarea
            class="vacation-reason"
            name="vacationReason"
            id="vacationReason"
            placeholder="휴가 사유를 입력해주세요."
          ></textarea>
        </div>
      </div>
    `;
  }
}
