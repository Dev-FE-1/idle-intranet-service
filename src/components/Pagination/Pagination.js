import {
  chevronLeft,
  chevronRight,
  chevronsLeft,
  chevronsRight,
} from '../../utils/icons.js';
import Icon from '../Icon/Icon.js';
import './Pagination.css';

export default class Pagination {
  constructor({ currentPage, maxPage, onPageChange }) {
    this.currentPage = currentPage;
    this.maxPage = maxPage;
    this.onPageChange = onPageChange;
    this.pages = [];
    this.chevrons_left = new Icon({
      svg: chevronsLeft,
      options: { size: '18px' },
    });
    this.chevron_left = new Icon({
      svg: chevronLeft,
      options: { size: '18px' },
    });
    this.chevron_right = new Icon({
      svg: chevronRight,
      options: { size: '18px' },
    });
    this.chevrons_right = new Icon({
      svg: chevronsRight,
      options: { size: '18px' },
    });
    this.calculatePages();
  }

  calculatePages() {
    this.pages = [];
    // 이렇게 조건이 길어질 경우, 주석을 추가해 코드의 흐름을 유도하는 것도 좋아보여요.
    const pageCalc = (currentPage, maxPage, pages) => {
      if (maxPage <= 7) {
        pages.push(...Array.from({ length: maxPage }, (_, i) => i + 1));
      } else if (currentPage < 5) {
        pages.push(
          ...Array.from({ length: 5 }, (_, i) => i + 1),
          '...',
          maxPage,
        );
      } else if (currentPage >= 5 && currentPage <= maxPage - 4) {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          maxPage,
        );
      } else {
        pages.push(
          1,
          '...',
          ...Array.from({ length: 5 }, (_, i) => i + maxPage - 4),
        );
      }
    };

    pageCalc(this.currentPage, this.maxPage, this.pages);
  }

  updatePage(newPage) {
    this.currentPage = newPage;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.updateButtonStates();
    this.render();
  }

  handleFastLeft = () => this.updatePage(1); // 1도 상수로 빼주면 어떨까요

  handleFastRight = () => this.updatePage(this.maxPage);

  handleLeft = () =>
    this.updatePage(this.currentPage === 1 ? 1 : this.currentPage - 1);

  handleRight = () =>
    this.updatePage(
      this.currentPage === this.maxPage ? this.maxPage : this.currentPage + 1,
    );

  handlePageClick = (page) => this.updatePage(page);

  getCurrentPage = () => this.currentPage;

  updateButtonStates() {
    document.querySelector('.fast-left').disabled = this.currentPage === 1;
    document.querySelector('.left').disabled = this.currentPage === 1;
    document.querySelector('.fast-right').disabled =
      this.currentPage === this.maxPage;
    document.querySelector('.right').disabled =
      this.currentPage === this.maxPage;
  }

  render() {
    document.querySelector('.pagination-container').innerHTML = this.html();
    this.addEventListeners();
    this.updateButtonStates();
  }

  addEventListeners() {
    document
      .querySelectorAll('.pagination-container button')
      // switch문으로 분리해보면 어떨까요
      // 혹은 이벤트 핸들러 배열을 만들어서 인덱스에 맞는 핸들러를 호출하는 방법도 고려해보면 좋아보여요.
      .forEach((button, index) => {
        // attachEventListeners
        if (index === 0) {
          button.addEventListener('click', this.handleFastLeft);
        } else if (index === 1) {
          button.addEventListener('click', this.handleLeft);
        } else if (index === this.pages.length + 2) {
          button.addEventListener('click', this.handleRight);
        } else if (index === this.pages.length + 3) {
          button.addEventListener('click', this.handleFastRight);
        } else {
          button.addEventListener('click', () =>
            this.handlePageClick(this.pages[index - 2]),
          );
        }
      });
  }

  html() {
    return `
      <div class='pagination-container'>
        <button class='fast-left'>${this.chevrons_left.html()}</button>
        <button class='left'>${this.chevron_left.html()}</button>
        ${this.pages
          .map((page) => {
            if (page === '...') {
              return `<button class='omit' disabled>${page}</button>`;
            }
            return `<button class='page ${
              page === this.currentPage ? 'active' : ''
            }'>${page}</button>`;
          })
          .join('')}
        <button class='right'>${this.chevron_right.html()}</button>
        <button class='fast-right'>${this.chevrons_right.html()}</button>
      </div>
    `;
  }
}
