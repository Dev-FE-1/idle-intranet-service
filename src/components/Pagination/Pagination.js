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
    const pageCalc = (currentPage, maxPage, pages) => {
      if (currentPage < 5) {
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

  handleFastLeft = () => {
    this.currentPage = 1;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.render();
  };

  handleFastRight = () => {
    this.currentPage = this.maxPage;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.render();
  };

  handleLeft = () => {
    this.currentPage = this.currentPage === 1 ? 1 : this.currentPage - 1;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.render();
  };

  handleRight = () => {
    this.currentPage =
      this.currentPage === this.maxPage ? this.maxPage : this.currentPage + 1;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.render();
  };

  handlePageClick = (page) => {
    this.currentPage = page;
    this.calculatePages();
    this.onPageChange(this.currentPage);
    this.render();
  };

  getCurrentPage = () => this.currentPage;

  render() {
    document.querySelector('.pagination-container').innerHTML = this.html();
    this.addEventListeners();
  }

  addEventListeners() {
    document
      .querySelectorAll('.pagination-container button')
      .forEach((button, index) => {
        if (index === 0) {
          button.addEventListener('click', this.handleFastLeft);
        } else if (index === 1) {
          button.addEventListener('click', this.handleLeft);
        } else if (index === this.pages.length + 2) {
          button.addEventListener('click', this.handleRight);
        } else if (index === this.pages.length + 3) {
          button.addEventListener('click', this.handleFastRight);
        } else {
          button.addEventListener('click', () => {
            this.handlePageClick(this.pages[index - 2]);
          });
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
              return `<button class='disabled' disabled>${page}</button>`;
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
