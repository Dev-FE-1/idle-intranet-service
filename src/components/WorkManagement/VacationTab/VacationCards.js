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

  handleVacationCardClick = async (vacationDataType) => {
    this.vacationForm = new VacationForm(vacationDataType);
    this.setModal({
      mainContent: this.vacationForm.html(),
      onSubmit: () => {
        console.log('휴가 신청 제출');
      },
    });
    this.modal.open();
    this.vacationForm.render();
  };

  renderVacationCard() {
    const $vacationCardsList = this.$vacationCardContainer.querySelector(
      '.vacation-cards-list',
    );

    if ($vacationCardsList) {
      $vacationCardsList.innerHTML = vacationArray
        .map((vacationData) => new VacationCard(vacationData).html())
        .join('');

      $vacationCardsList
        .querySelectorAll('.vacation-card')
        .forEach((card, index) => {
          card.addEventListener('click', () => {
            const vacationData = vacationArray[index];
            this.handleVacationCardClick(vacationData.type, vacationData.days);
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
      </div>
    `;
    this.renderVacationCard();
  }
}
