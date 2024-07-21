import './VacationForm.css';
import Icon from '../Icon/Icon.js';
import Input from '../Input/Input.js';
import Select from '../Select/Select.js';
import { calendarIcon } from '../../utils/icons.js';
import {
  adjustStartDate,
  calculateEndDate,
  calculateEndTime,
  formatDateToISO,
  listVacationDaysWithSuffix,
} from '../../utils/userVacation.js';
import {
  availableStartTimes,
  hourIncrements,
  vacationArray,
} from '../../utils/vacation.js';
import { storeInstance } from '../Store.js';
import Calendar from '../Calendar/Calendar.js';
import {
  initializeValidationListeners,
  updateErrorState,
  validateInput,
} from '../../utils/formValidationUtils.js';

export default class VacationForm {
  constructor(vacationDataType) {
    this.store = storeInstance;
    this.vacationDataType = vacationDataType;
    this.CalendarIcon = new Icon({
      svg: calendarIcon,
      options: {
        size: '1.2rem',
      },
    });
    this.selectedDate = adjustStartDate(new Date());
    this.vacationStartTime = '09:00';
    this.vacationEndTime = '18:00';
  }

  async updateVacationList() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    return listVacationDaysWithSuffix(this.user.remainingVacationDays);
  }

  // eslint-disable-next-line class-methods-use-this
  getIcon(vacationType) {
    const vacation = vacationArray.find((v) => v.type === vacationType);
    return vacation ? vacation.icon : '';
  }

  async initFormInputs() {
    this.VacationTypeInput = new Input({
      id: 'vacationType',
      type: 'text',
      value: `${this.getIcon(this.vacationDataType)} ${this.vacationDataType}`,
      readOnly: 'read-only',
    });

    const startDateISO = formatDateToISO(this.selectedDate);
    this.StartDateInput = new Input({
      id: 'startDate',
      type: 'text',
      value: startDateISO,
      readOnly: 'read-only',
    });

    const days = await this.updateVacationList();
    this.DaySelect = new Select({
      contents: days,
      onSelect: (selectedItem) => {
        this.selectedDays = selectedItem;
        this.calculateAndDisplayEndDate(selectedItem);
      },
      small: true,
    });

    this.EndDateInput = new Input({
      id: 'endDate',
      type: 'text',
      value: '',
      readOnly: 'read-only',
    });

    this.TimeSelect = new Select({
      contents: availableStartTimes,
      onSelect: (selectedItem) => {
        this.vacationStartTime = selectedItem;
        this.vacationEndTime = calculateEndTime(
          selectedItem,
          this.selectedHours,
        );
        updateErrorState(selectedItem, this.HourSelect.selectedItem);
      },
      excludeFirst: true,
      small: true,
    });

    this.HourSelect = new Select({
      contents: hourIncrements,
      onSelect: (selectedItem) => {
        const hours = parseInt(selectedItem.match(/\d+/)[0], 10);
        this.selectedHours = hours;
        this.vacationEndTime = calculateEndTime(this.vacationStartTime, hours);
        updateErrorState(this.TimeSelect.selectedItem, selectedItem);
      },
      excludeFirst: true,
      small: true,
    });

    if (this.vacationDataType === '반차') {
      document.querySelector('.day-select').parentElement.style.display =
        'none';
      document.querySelector('.end-date-input').parentElement.style.display =
        'none';
      document.querySelector('.time-field').style.display = 'flex';
    }
  }

  calculateAndDisplayEndDate(selectedItem) {
    let selectedDay = selectedItem;
    if (!selectedDay) {
      selectedDay = 1;
    }
    if (this.StartDateInput) {
      const startDate = new Date(this.StartDateInput.value);
      const numberOfDays = parseInt(selectedDay, 10);
      const endDate = calculateEndDate(startDate, numberOfDays);
      this.EndDateInput.value = endDate;
      this.$endDateInput.innerHTML = this.EndDateInput.html();
    }
  }

  validateForm() {
    const formElement = document.getElementById('vacationForm');
    const inputs = formElement.querySelectorAll(
      '.input-field input, .input-field textarea',
    );

    let isValid = true;

    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (this.vacationDataType === '반차') {
      const timeField = document.querySelector('.time-field');
      const timeSelectValid =
        this.TimeSelect.selectedItem &&
        this.TimeSelect.selectedItem !== '00:00';
      const hourSelectValid =
        this.HourSelect.selectedItem &&
        this.HourSelect.selectedItem !== '0시간';

      if (!timeSelectValid || !hourSelectValid) {
        timeField.classList.add('input-error');
        isValid = false;
      } else {
        timeField.classList.remove('input-error');
      }
    }

    return isValid;
  }

  async render() {
    this.$vacationTypeInput = document.querySelector('.vacation-type-input');
    this.$daySelect = document.querySelector('.day-select');
    this.$timeSelect = document.querySelector('.time-select');
    this.$hourSelect = document.querySelector('.hour-select');
    this.$startDateInput = document.querySelector('.start-date-input');
    this.$endDateInput = document.querySelector('.end-date-input');
    this.$vacationForm = document.querySelector('.vacation-form');
    this.$calendarContainer = this.$vacationForm.querySelector(
      '.calendar-container',
    );
    this.$startDateInputField = this.$startDateInput.querySelector('input');

    await this.initFormInputs();

    this.Calendar = new Calendar(this.selectedDate);
    const initializeCalendar = () => {
      this.$calendarContainer.innerHTML = this.Calendar.html();
      this.Calendar.renderGenerateCalendar();
      this.Calendar.addEventListeners();
    };

    const toggleCalendar = (event) => {
      if (
        event.target.closest('.start-date-input') ||
        event.target.closest('.calendar-icon')
      ) {
        this.$calendarContainer.classList.add('active');
        initializeCalendar();
      } else if (!this.$calendarContainer.contains(event.target)) {
        this.$calendarContainer.classList.remove('active');
      }
    };

    document.addEventListener('dateSelected', (event) => {
      this.selectedDate = adjustStartDate(new Date(event.detail.selectedDate));
      const startDateISO = formatDateToISO(this.selectedDate);
      this.StartDateInput.value = startDateISO;
      this.$startDateInput.querySelector('input').value = startDateISO;
      this.calculateAndDisplayEndDate(this.selectedDays);
      this.Calendar.closeCalendar();
    });

    this.$startDateInput.addEventListener('click', toggleCalendar);
    document.addEventListener('click', toggleCalendar);

    if (!this.selectedDays) {
      this.selectedDays = 1;
      this.DaySelect.onSelect(this.selectedDays);
    }

    this.calculateAndDisplayEndDate(this.selectedDays);

    this.$vacationTypeInput.innerHTML = this.VacationTypeInput.html();
    this.$daySelect.innerHTML = this.DaySelect.html();
    this.$timeSelect.innerHTML = this.TimeSelect.html();
    this.$hourSelect.innerHTML = this.HourSelect.html();
    this.$startDateInput.innerHTML = `${this.StartDateInput.html()} ${this.CalendarIcon.html()}`;
    this.$endDateInput.innerHTML = this.EndDateInput.html();

    this.DaySelect.setEventListeners();
    this.TimeSelect.setEventListeners();
    this.HourSelect.setEventListeners();

    initializeValidationListeners();
  }

  getSelectedVacationData() {
    return {
      vacationType: this.vacationDataType,
      vacationStartDate: this.StartDateInput.value,
      vacationEndDate: this.EndDateInput.value,
      vacationRequestDate: formatDateToISO(new Date()),
      vacationStartTime: this.vacationStartTime,
      vacationEndTime: this.vacationEndTime,
      vacationReason: document.querySelector('#vacationReason').value,
      approvalStatus: '미승인',
      usageStatus: '미사용',
    };
  }

  // eslint-disable-next-line class-methods-use-this
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
          <div class="calendar-container"></div>
        </div>
        <div class="input-field border">
          <label>사용기간</label>
          <div class="day-select"></div>
        </div>
        <div class="input-field input-readonly">
          <label>종료일</label>
          <div class="end-date-input"></div>
        </div>
        <div class="input-field border time-field" style="display: none;">
          <label>사용 시간</label>
          <div class="time-container" id="useTime">
            <div class="time-select" id="timeSelect"></div>
            <span class="from-text">부터</span>
            <div class="hour-select" id="hourSelect"></div>
          </div>
        </div>
        <div class="input-field border">
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
