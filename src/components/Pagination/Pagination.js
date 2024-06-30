import { chevron_left, chevron_right, chevrons_left, chevrons_right } from '../../utils/icons';
import Icon from '../Icon/Icon';
import './Pagination.css';

export default class Pagination {
  constructor({ currentPage, maxPage }) {
    this.currentPage = currentPage;
    this.maxPage = maxPage;
    this.pages = [];
    this.chevrons_left = new Icon({svg: chevrons_left, options:{size: '14px'}});
    this.chevron_left = new Icon({svg: chevron_left, options:{size: '14px'}});
    this.chevron_right = new Icon({svg: chevron_right, options:{size: '14px'}});
    this.chevrons_right = new Icon({svg: chevrons_right, options:{size: '14px'}});

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
    pageCalcDown(currentPage, this.pages);
    pageCalcUp(currentPage, maxPage, this.pages);
  }

  html() {
    return `
      <div class='pagination-container'>
        <button>${this.chevrons_left.html()}</button>
        <button>${this.chevron_left.html()}</button>
        ${this.pages
          .map((page) => {
            if (page == 1) return `<button class='active'>${page}</button>`;
            else if (page == '...')
              return `<div>${page}</div>`;
            else return `<button>${page}</button>`;
          })
          .join('')}
        <button>${this.chevron_right.html()}</button>
        <button>${this.chevrons_right.html()}</button>
      </div>
    `;
  }
}
