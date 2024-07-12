import './WorkManage.css';
import Container from '../../components/Container.js';
import Title from '../../components/Title/Title.js';
import VacationCards from '../../components/WorkManagement/VacationTab/VacationCards.js';
import VacationHistories from '../../components/WorkManagement/VacationTab/VacationHistories.js';
import WorkingTab from '../../components/WorkManagement/WorkingTab.js';
import { PATH_TITLE } from '../../utils/constants.js';

export default class WorkManagePage extends Container {
  constructor() {
    super('#main');
    this.Title = new Title({ title: PATH_TITLE.WORK_MANAGE });
    this.vacationCards = new VacationCards();
    this.vacationHistories = new VacationHistories();
    this.workingTab = new WorkingTab();
  }

  setupMenuInteraction() {
    const menuItems = this.$container.querySelectorAll(
      '.work-manage-menu-item',
    );
    menuItems.forEach((menuItem) =>
      menuItem.addEventListener('click', (event) => {
        menuItems.forEach((item) => item.classList.remove('active'));
        event.currentTarget.classList.add('active');

        this.renderContent(event.currentTarget.id);
      }),
    );
  }

  async renderContent(tabId) {
    const sections = {
      'work-management': [
        this.$container.querySelector('.working-tab-container'),
      ],
      'vacation-management': [
        this.$container.querySelector('.vacation-cards-container'),
        this.$container.querySelector('.vacation-histories-container'),
      ],
    };

    Object.values(sections).forEach((sectionArray) =>
      sectionArray.forEach((section) => {
        if (section) {
          section.classList.add('hidden');
        }
      }),
    );

    const activeSections = sections[tabId];
    if (activeSections) {
      activeSections.forEach((section) => {
        if (section) {
          section.classList.remove('hidden');
        }
      });
    }

    switch (tabId) {
      case 'work-management':
        this.workingTab.render();
        break;
      case 'vacation-management':
        await this.renderVacationTab();
        break;
      default:
        await this.workingTab.render();
    }
  }

  renderVacationTab() {
    this.vacationCards.render();
    this.vacationHistories.render();
  }

  async render() {
    this.$container.innerHTML = /* HTML */ `
      <div class="work-manage-header-container">
        ${this.Title.html()}
        <ul class="work-manage-menu-list wrapper">
          <li class="work-manage-menu-item active" id="work-management">
            근무 관리
          </li>
          <li class="work-manage-menu-item" id="vacation-management">
            휴가 관리
          </li>
        </ul>
      </div>
      <div id="work-manage-content" class="work-manage-content">
        <section class="vacation-cards-container hidden"></section>
        <section class="vacation-histories-container hidden"></section>
        <section class="working-tab-container"></section>
      </div>
    `;
    await this.workingTab.render();
    this.setupMenuInteraction();
  }
}
