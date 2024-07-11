import './VacationCards.css';
import VacationCard from './VacationCard.js';
import { vacationArray } from '../../../utils/vacation.js';

export default class VacationCards {
  renderVacationCard() {
    const $vacationCardsList = this.$vacationCardContainer.querySelector(
      '.vacation-cards-list',
    );

    if ($vacationCardsList) {
      $vacationCardsList.innerHTML = vacationArray
        .map((vacationData) => new VacationCard(vacationData).html())
        .join('');
    }
  }

  render() {
    this.$vacationCardContainer = document.querySelector(
      '#main .vacation-cards-container',
    );

    this.$vacationCardContainer.innerHTML = /* HTML */ `
      <div class="wrapper">
        <h3 class="vacation-cards-title">휴가 신청하기</h3>
        <ul class="vacation-cards-list"></ul>
      </div>
    `;
    this.renderVacationCard();
  }
}
