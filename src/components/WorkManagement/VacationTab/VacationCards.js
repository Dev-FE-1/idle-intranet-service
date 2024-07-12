import './VacationCards.css';
import VacationCard from './VacationCard.js';
import { vacationArray } from '../../../utils/vacation.js';
import Modal from '../../Modal/Modal.js';
import VacationForm from '../../VacationForm/VacationForm.js';

export default class VacationCards {
  constructor() {
    this.modal = new Modal({
      title: '휴가 신청',
      buttonContent: '휴가 신청하기',
    });
    this.vacationForm = new VacationForm();
  }

  setModal({ mainContent, onSubmit }) {
    const modalWrapper = document.body.querySelector('.vacation-modal-wrapper');
    this.modal.mainContent = mainContent;
    this.modal.onSubmit = onSubmit;
    modalWrapper.innerHTML = this.modal.html();
    this.modal.render();
  }

  // handleVacationCardClick = (type, days) => {
  handleVacationCardClick = async (vacationDataType) => {
    // const mainContent = `휴가 타입: ${type}, 남은 휴가 일수: ${days}`;
    this.vacationForm = new VacationForm(vacationDataType);
    await this.vacationForm.render();
    this.setModal({
      mainContent: this.vacationForm.render(),
      onSubmit: () => {
        console.log('휴가 신청 제출');
      },
    });
    this.modal.open();
  };

  renderVacationCard() {
    const $vacationCardsList = this.$vacationCardContainer.querySelector(
      '.vacation-cards-list',
    );

    if ($vacationCardsList) {
      $vacationCardsList.innerHTML = vacationArray
        .map((vacationData) => {
          const vacationCard = new VacationCard(vacationData);
          return vacationCard.html();
        })
        .join('');

      $vacationCardsList
        .querySelectorAll('.vacation-card')
        .forEach((card, index) => {
          card.addEventListener('click', () => {
            const vacationData = vacationArray[index];
            this.handleVacationCardClick(vacationData.type);
            // this.handleVacationCardClick(vacationData.type, vacationData.days);
          });
        });
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
        <div class="vacation-modal-wrapper"></div>
      </div>
    `;
    this.renderVacationCard();
  }
}
