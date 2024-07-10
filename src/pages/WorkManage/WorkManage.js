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
    this.$container = document.querySelector('.work-manage-content');
  }

  addEventListeners() {
    const menu = this.$container.querySelector('.work-manage-menu-list');
    menu.addEventListener('click', async (event) => {
      const { target } = event;
      const { id: targetId } = target;
      const contentContainer = this.$container.querySelector(
        '#work-manage-content',
      );

      if (!targetId) return;

      if (targetId === 'work-management') {
        contentContainer.innerHTML = this.workingTab.render();
      } else if (targetId === 'vacation-management') {
        await this.vacationHistories.render(); // 비동기 작업을 기다림
        contentContainer.innerHTML = `${this.vacationCards.render()}${this.vacationHistories.$container.innerHTML}`;
      }
      this.updateActiveMenuItem(targetId);
    });
  }

  updateActiveMenuItem(activeId) {
    const menuItems = this.$container.querySelectorAll(
      '.work-manage-menu-item',
    );
    menuItems.forEach((item) => item.classList.remove('active'));
    const activeItem = this.$container.querySelector(`#${activeId}`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }

  async render() {
    await this.vacationHistories.initContainer();
    await this.vacationHistories.render();

    this.$container.innerHTML = `
      <div class="work-manage-header-container">
        ${this.Title.html()}
        <ul class="work-manage-menu-list wrapper">
          <li class="work-manage-menu-item" id="work-management">근무 관리</li>
          <li class="work-manage-menu-item active" id="vacation-management">휴가 관리</li>
        </ul>
      </div>
      <div id="work-manage-content" class="work-manage-content">
        ${this.vacationCards.render()}
        ${this.vacationHistories.$container.innerHTML} 
      </div>
    `;
    this.addEventListeners();
  }
}
