import './Pagination.css';

export default class Pagination {
  constructor({ currentPage, maxPage }) {
    this.currentPage = currentPage;
    this.maxPage = maxPage;
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
    pageCalcDown(currentPage, this.pages);
    pageCalcUp(currentPage, maxPage, this.pages);
  }

  html() {
    return `
      <div class='pagination-container'>
        <button>&laquo</button>
        ${this.pages
          .map((page) => {
            if(page == 1) return `<button class='active'>${page}</button>`
            else if(page == '...') return `<button style='border: 0'>${page}</button>`
            else return `<button>${page}</button>`;
          })
          .join('')}
        <button>&raquo</button>
      </div>
    `;
  }
}
