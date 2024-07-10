import './VacationCards.css';
import VacationCard from './VacationCard.js';
import { vacationArray } from '../../../utils/vacation.js';
import ManagementSection from '../ManagementSection.js';

export default class VacationCards {
  constructor() {
    const vacationHTML = vacationArray
      .map((vacationData) => new VacationCard({ vacationData }).html())
      .join('');

    const listhtml = `<ul class="vacation-cards">${vacationHTML}</ul>`;

    this.managementSection = new ManagementSection({
      title: '휴가 신청하기',
      contents: [listhtml],
    });
  }

  render() {
    return this.managementSection.html();
  }
}
