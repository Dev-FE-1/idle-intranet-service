import './VacationCards.css';
import VacationCard from './VacationCard.js';
import { vacationArray } from '../../../utils/vacation.js';
import Modal from '../../Modal/Modal.js';
import VacationForm from '../../VacationForm/VacationForm.js';
import { updateVacationRequests } from '../../../api/endpoints/vacationRequests.js';
import { storeInstance } from '../../Store.js';

export default class VacationCards {
  constructor() {
    this.modal = new Modal({
      title: '휴가 신청',
      buttonContent: '휴가 신청하기',
    });
    this.vacationForm = new VacationForm();
    this.store = storeInstance;
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
      onSubmit: async () => {
        const vacationData = this.vacationForm.getSelectedVacationData();

        const requestData = {
          ...vacationData,
          employeeNumber: await this.getEmployeeNumber(), // 여기서 employeeNumber를 가져옵니다.
        };
        console.log('신청한 휴가 데이터:', { ...requestData });

        const response = await updateVacationRequests(requestData);
        if (response.status === 'OK') {
          console.log('휴가 신청이 완료되었습니다.');
        } else {
          console.log('휴가 신청에 실패했습니다.');
        }
        this.modal.close();
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
            this.handleVacationCardClick(vacationData.type, vacationData.days);
          });
        });
    }
  }

  async render() {
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

  async getEmployeeNumber() {
    const user = await this.store.getUser();
    return user.employeeNumber;
  }
}
