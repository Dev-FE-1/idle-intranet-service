import Container from '../../components/Container.js';
import Title from '../../components/Title/Title.js';
import Input from '../../components/Input/Input.js';
import Table from '../../components/Table/Table.js';
import { COLORS, PATH, PATH_TITLE } from '../../utils/constants.js';
import './Members.css';
import Icon from '../../components/Icon/Icon.js';
import { magnifyingGlass } from '../../utils/icons.js';
import Pagination from '../../components/Pagination/Pagination.js';
import {
  getMembers,
  searchMembers,
} from '../../components/API/MemberService.js';
import { isLoggedIn } from '../../components/API/AuthService.js';

export default class MembersPage extends Container {
  constructor() {
    super('#main');
    this.Title = new Title({
      title: PATH_TITLE.MEMBERS,
    });
    this.magnifyGlass = new Icon({
      svg: magnifyingGlass,
      options: { size: '18px', color: COLORS.DARK_GRAY },
    });
    this.input = new Input({
      placeholder: '이름을 입력하세요',
      id: 'search-input',
      required: true,
    });
    this.currentPage = 1;
    this.maxProfile = 7;
    this.contents = [];
    this.total = 0;

    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.getMember();
      }
    });
  }

  handlePageChange = (newPage) => {
    this.currentPage = newPage;
    const searchValue = document.getElementById('search-input').value;
    if (searchValue) {
      this.searchMember(searchValue);
    } else {
      this.getMember();
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.currentPage = 1;
    const searchValue = document.getElementById('search-input').value;
    this.searchMember(searchValue);
  };

  searchMember = (name) => {
    if (name === '') {
      this.getMember();
    } else {
      searchMembers(name, this.maxProfile, this.currentPage)
        .then(([data, total]) => {
          this.contents = data;
          this.total = total;
          this.renderPagination();
          this.renderTable();
          this.updateTotalCount();
        })
        .catch((error) => {
          console.error('Failed to search members:', error.message);
        });
    }
  };

  getMember = () => {
    getMembers(this.currentPage, this.maxProfile)
      .then(([data, total]) => {
        this.contents = data;
        this.total = total;
        this.renderPagination();
        this.renderTable();
        this.updateTotalCount();
      })
      .catch((error) => {
        console.error('Failed to load page data:', error);
      });
  };

  resetSearch = () => {
    this.currentPage = 1;
    document.getElementById('search-input').value = '';
    this.getMember();
  };

  updateTotalCount = () => {
    document.querySelectorAll('.members-container em').forEach((em) => {
      // eslint-disable-next-line no-param-reassign
      em.innerText = this.total;
    });
  };

  renderPagination = () => {
    this.pagination = new Pagination({
      currentPage: this.currentPage,
      maxPage: Math.ceil(this.total / this.maxProfile),
      onPageChange: this.handlePageChange,
    });
    if (window.location.pathname === PATH.MEMBERS) {
      document.body.querySelector('.pagination-container').innerHTML =
        this.pagination.html();
      this.pagination.render();
    }
  };

  renderTable = () => {
    const transformedEmployees = this.contents.map((employee) => [
      employee.name,
      employee.position,
      employee.departmentName,
      employee.email,
      employee.phoneNumber,
    ]);

    this.table = new Table({
      headers: ['이름', '직무', '조직', '이메일', '연락처'],
      contents: transformedEmployees,
    });
    if (this.total === 0) {
      document.getElementById('table-container').innerHTML = /* HTML */ `
        <div class="no-reult-container">
          <img src="images/no-result.png" alt="결과 없음" />
        </div>
      `;
    } else if (window.location.pathname === PATH.MEMBERS) {
      document.getElementById('table-container').innerHTML = this.table.html();
    }
  };

  render() {
    this.$container.innerHTML = `
      <div class='members-container'>
        <div class='members-mobile-only'>
          ${this.Title.html()}
          <span>총 <em>${this.total}</em> 명</span>
        </div>
        <div class='members-content-container'>
          <div class='members-search-header'>
            <span>총 <em>${this.total}</em> 명</span>
            <form id="search-form" class='members-input-container'>
              ${this.input.html()}
              <button type="submit" class='submit-button'>
                ${this.magnifyGlass.html()}
              </button>
            </form>
          </div>
          <div id='table-container'>
            ${this.table ? this.table.html() : ''}
          </div>
        </div>
        <div class='pagination-container'>
          ${this.pagination ? this.pagination.html() : ''}
        </div>
      </div>
    `;

    if (this.pagination) {
      this.pagination.render();
    }

    document
      .querySelector('.submit-button')
      .addEventListener('click', this.handleFormSubmit);

    this.resetSearch();
  }
}
