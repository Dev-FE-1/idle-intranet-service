import {
  chevron_left,
  chevron_right,
  chevrons_left,
  chevrons_right,
} from '../../utils/icons';
import Icon from '../Icon/Icon';
import './Pagination.css';

export default class Pagination {
  constructor({ currentPage, maxPage }) {
    this.currentPage = currentPage;
    this.maxPage = maxPage;
    this.pages = [];
    this.chevrons_left = new Icon({
      svg: chevrons_left,
      options: { size: '14px' },
    });
    this.chevron_left = new Icon({
      svg: chevron_left,
      options: { size: '14px' },
    });
    this.chevron_right = new Icon({
      svg: chevron_right,
      options: { size: '14px' },
    });
    this.chevrons_right = new Icon({
      svg: chevrons_right,
      options: { size: '14px' },
    });
    this.calculatePages();
  }

  calculatePages() {
    this.pages = [];
    let pageCalcDown = (currentPage, pages) => {
      if (currentPage > 4) {
        pages.push(1, '...', currentPage - 2, currentPage - 1);
      } else {
        pages.push(...Array.from({ length: currentPage - 1 }, (_, i) => i + 1));
      }
    };

    let pageCalcUp = (currentPage, maxPage, pages) => {
      if (maxPage - currentPage <= 3) {
        pages.push(
          ...Array.from(
            { length: maxPage - currentPage + 1 },
            (_, i) => i + currentPage,
          ),
        );
      } else {
        pages.push(
          currentPage,
          currentPage + 1,
          currentPage + 2,
          '...',
          maxPage,
        );
      }
    };
    pageCalcDown(this.currentPage, this.pages);
    pageCalcUp(this.currentPage, this.maxPage, this.pages);
  }

  handleFastLeft = () => {
    this.currentPage = 1;
    this.calculatePages();
    this.render();
  };

  handleFastRight = () => {
    this.currentPage = this.maxPage;
    this.calculatePages();
    this.render();
  };

  handleLeft = () => {
    this.currentPage = this.currentPage === 1 ? 1 : this.currentPage - 1;
    this.calculatePages();
    this.render();
  };

  handleRight = () => {
    this.currentPage =
      this.currentPage === this.maxPage ? this.maxPage : this.currentPage + 1;
    this.calculatePages();
    this.render();
  };

  handlePageClick = (page) => {
    this.currentPage = page;
    this.calculatePages();
    this.render();
  };

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
        <button>${this.chevrons_left.html()}</button>
        <button>${this.chevron_left.html()}</button>
        ${this.pages
          .map((page) => {
            if (page === '...') {
              return `<button style='cursor:default; border:0' disabled>${page}</button>`;
            } else {
              return `<button class='page ${page === this.currentPage ? 'active' : ''}'>${page}</button>`;
            }
          })
          .join('')}
        <button>${this.chevron_right.html()}</button>
        <button>${this.chevrons_right.html()}</button>
      </div>
    `;
  }
}
