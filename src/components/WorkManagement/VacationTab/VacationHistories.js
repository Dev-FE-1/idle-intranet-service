import './VacationHistories.css';
import VacationHistory from './VacationHistory.js';
import Select from '../../Select/Select.js';
import { vacationTypes } from '../../../utils/vacation.js';
import { storeInstance } from '../../Store.js';
import { fetchVacationRequests } from '../../../api/endpoints/vacationRequests.js';

export default class VacationHistories {
  constructor() {
    this.store = storeInstance;
    this.isLoading = true;
    this.VacationSelect = new Select({
      contents: vacationTypes,
      onSelect: (selectedItem) => console.log('Selected:', selectedItem),
      roundedBorder: true,
    });
  }

  async setVacation() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    this.vacations = await fetchVacationRequests(this.user.employeeNumber);
  }

  async renderVacationHistories() {
    const $vacationHistoriesList =
      this.$vacationHistoriesContainer.querySelector(
        '.vacation-histories-list',
      );

    if (!this.vacations) {
      await this.setVacation();
    }

    if ($vacationHistoriesList) {
      $vacationHistoriesList.innerHTML = this.vacations
        .map((vacation) => new VacationHistory(vacation).html())
        .join('');
    }
  }

  async render() {
    this.$vacationHistoriesContainer = document.querySelector(
      '#main .vacation-histories-container',
    );

    this.$vacationHistoriesContainer.innerHTML = /* HTML */ `
      <div class="wrapper">
        <div class="vacation-histories-header">
          <h3 class="vacation-histories-title">사용 기록</h3>
          ${this.VacationSelect.html()}
        </div>
        <ul class="vacation-histories-list"></ul>
      </div>
    `;
    await this.setVacation();
    await this.renderVacationHistories();
    this.VacationSelect.setEventListeners();
  }
}
