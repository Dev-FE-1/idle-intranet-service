import './VacationHistories.css';
import Select from '../../Select/Select.js';
import { vacationTypes } from '../../../utils/vacation.js';
import { storeInstance } from '../../Store.js';
import { fetchVacationRequests } from '../../../api/endpoints/vacationRequests.js';
import Table from '../../Table/Table.js';

export default class VacationHistories {
  constructor() {
    this.store = storeInstance;
    this.isLoading = true;
    this.VacationSelect = new Select({
      contents: vacationTypes,
      onSelect: (selectedItem) => this.onSelectType(selectedItem),
      roundedBorder: true,
    });
  }

  onSelectType(selectedItem) {
    let filteredVacations = this.vacations.filter(
      (vacation) => vacation.vacationType === selectedItem,
    );

    if (selectedItem === '전체 휴가') {
      filteredVacations = this.vacations;
    }

    this.renderTable(filteredVacations, selectedItem);
  }

  // eslint-disable-next-line class-methods-use-this
  setTableContents(vacations) {
    return vacations.map(
      ({
        vacationStartDate,
        vacationEndDate,
        vacationType,
        approvalStatus,
        vacationRequestDate,
      }) => [
        vacationType,
        `<span class="vacation-status">${approvalStatus}</span>`,
        vacationStartDate,
        vacationEndDate,
        vacationRequestDate,
      ],
    );
  }

  renderTable(vacations, selectedItem = null) {
    const tableContents = this.setTableContents(vacations);
    this.Table = new Table({
      headers: [
        '휴가 종류',
        '승인 상태',
        '휴가 시작일',
        '휴가 종료일',
        '신청일',
      ],
      contents: tableContents,
    });

    const $tableContainer = this.$vacationHistoriesContainer.querySelector(
      '.vacation-table-container',
    );

    if (!vacations.length && selectedItem) {
      $tableContainer.innerHTML = /* HTML */ `
        <p class="no-vacations-result">
          <strong>'${selectedItem}'</strong> 사용 기록이 없습니다.
        </p>
      `;
    } else {
      $tableContainer.innerHTML = this.Table.html();
    }
  }

  async setVacation() {
    if (!this.user) {
      this.user = await this.store.getUser();
    }
    this.vacations = await fetchVacationRequests(this.user.employeeNumber);
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
      </div>
      <div class="vacation-table-container"></div>
    `;
    await this.setVacation();
    this.renderTable(this.vacations);
    this.VacationSelect.setEventListeners();
  }
}
