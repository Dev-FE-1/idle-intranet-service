import './VacationHistories.css';
import VacationHistory from './VacationHistory.js';
import Select from '../../Select/Select.js';
import { fetchVacationRequests } from '../../../api/endpoints/vacationRequests.js';
import { vacationTypes } from '../../../utils/vacation.js';
import { storeInstance } from '../../Store.js';

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

  async initContainer() {
    this.$container = document.querySelector('.vacation-histories-container');
    if (!this.$container) {
      this.$container = document.createElement('section');
      this.$container.className = 'vacation-histories-container';
      document.querySelector('#main').appendChild(this.$container);
    }

    const headerHtml = /* HTML */ `
      <section class="vacation-histories-container">
        <div class="wrapper">
          <div class="vacation-histories-header">
            <h3 class="vacation-histories-title">사용 기록</h3>
            ${this.VacationSelect.html()}
          </div>
          <ul class="vacation-histories-list"></ul>
        </div>
      </section>
    `;

    this.$container.innerHTML = headerHtml;
    this.VacationSelect.setEventListeners();
  }

  async renderVacations() {
    const listContainer = this.$container.querySelector(
      '.vacation-histories-list',
    );
    if (!listContainer) {
      console.error('Cannot find the vacation history list container.');
      return;
    }

    if (!this.vacations) {
      await this.setVacation();
    }

    listContainer.innerHTML = this.vacations
      .map((vacation) => new VacationHistory(vacation).render())
      .join('');
  }

  async render() {
    if (!this.$container) {
      await this.initContainer();
    }

    await this.setVacation();
    await this.renderVacations();
  }
}
