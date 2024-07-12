import {
  calculateEndDate,
  listVacationDaysWithSuffix,
} from '../../utils/userVacation.js';
import { vacationArray } from '../../utils/vacation.js';
import Input from '../Input/Input.js';
import Select from '../Select/Select.js';
import { storeInstance } from '../Store.js';
import './VacationForm.css';

export default class VacationForm {
  constructor(vacationDataType) {
    this.store = storeInstance;
    this.vacationDataType = vacationDataType;
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

  removeDaySuffix(dayString) {
    return dayString.replace('일', '');
  }

  async initFormInputs() {
    this.VacationTypeInput = new Input({
      id: 'vacationType',
      type: 'text',
      value: `${this.getIcon(this.vacationDataType)} ${this.vacationDataType}`,
      readOnly: true,
    });

    this.StartDateInput = new Input({
      id: 'startDate',
      type: 'date',
      value: new Date().toISOString().split('T')[0],
      onChange: () => this.calculateAndDisplayEndDate(),
    });

    const days = await this.updateVacationList();
    this.DaySelect = new Select({
      contents: days,
      onSelect: () => this.calculateAndDisplayEndDate(),
      small: true,
    });

    this.EndDateInput = new Input({
      id: 'endDate',
      type: 'text',
      value: '',
      readOnly: true,
    });
  }

  calculateAndDisplayEndDate() {
    if (this.StartDateInput && this.DaySelect.selectedItem) {
      const startDate = new Date(this.StartDateInput.value);
      const numberOfDays = parseInt(
        this.removeDaySuffix(this.DaySelect.selectedItem),
        10,
      );
      const endDate = calculateEndDate(startDate, numberOfDays);

      if (endDate instanceof Date) {
        this.EndDateInput.value = endDate.toISOString().split('T')[0];
        this.$endDateInput.innerHTML = this.EndDateInput.html();
      } else {
        console.error(
          'calculateEndDate did not return a Date object:',
          endDate,
        );
      }
    }
  }

  async render() {
    this.$vacationTypeInput = document.querySelector('.vacation-type-input');
    this.$daySelect = document.querySelector('.day-select');
    this.$startDateInput = document.querySelector('.start-date-input');
    this.$endDateInput = document.querySelector('.end-date-input');

    await this.initFormInputs();
    this.$vacationTypeInput.innerHTML = this.VacationTypeInput.html();
    this.$daySelect.innerHTML = this.DaySelect.html();
    this.$startDateInput.innerHTML = this.StartDateInput.html();
    this.$endDateInput.innerHTML = this.EndDateInput.html();

    this.DaySelect.setEventListeners();
    this.StartDateInput.setEventListeners();

    this.calculateAndDisplayEndDate();
  }

  html() {
    return /* HTML */ `
      <div class="vacation-form" id="vacationForm">
        <div class="input-field input-readonly">
          <label>휴가 종류</label>
          <div class="vacation-type-input"></div>
        </div>
        <div class="input-field border">
          <label>시작일</label>
          <div class="start-date-input"></div>
        </div>
        <div class="input-field border">
          <label>사용기간</label>
          <div class="day-select"></div>
        </div>
        <div class="input-field input-readonly">
          <label>종료일</label>
          <div class="end-date-input"></div>
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
