import Main from '../../components/Main.js';
import Title from '../../components/Title/Title.js';
import Input from '../../components/Input/Input.js';
import Table from '../../components/Table/Table.js';
import { COLORS, PATH_TITLE } from '../../utils/constants.js';
import './Members.css';
import Icon from '../../components/Icon/Icon.js';
import { magnifyingGlass } from '../../utils/icons.js';
import Pagination from '../../components/Pagination/Pagination.js';
import MemberService from '../../components/API/MemberService.js';
import AuthService from '../../components/API/AuthService.js';

export default class MembersPage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: PATH_TITLE.MEMBERS,
    });
    this.magnifyGlass = new Icon({
      svg: magnifyingGlass,
      options: { size: '18px', color: COLORS.DARK_GRAY },
    });
    this.input = new Input({ placeholder: '이름을 입력하세요' });
    this.currentPage = 1;
    this.maxProfile = 7;
    this.memberService = new MemberService();
    this.contents = [];
    this.auth = new AuthService();

    if (this.auth.isLoggedIn()) {
      this.pagination = new Pagination({
        currentPage: this.currentPage,
        maxPage: 8,
        onPageChange: this.handlePageChange,
      });

      this.loadData(this.currentPage, this.maxProfile);
    }
  }

  handlePageChange = (newPage) => {
    this.currentPage = newPage;
    this.loadData(this.currentPage, this.maxProfile);
  };

  loadData(page, max) {
    this.memberService
      .loadPage(page, max)
      .then((data) => {
        this.contents = data;
        this.renderTable();
        this.render();
      })
      .catch((error) => {
        console.error('Failed to load page data:', error);
      });
  }

  renderTable() {
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
  }

  render() {
    this.$container.innerHTML = `
      <div class='members-container'>
        <div class='members-mobile-only'>
          <span>총 <em>50</em> 명</span>
        </div>
        <div class='members-content-container'>
          <div class='members-search-header'>
            <span>총 <em>50</em> 명</span>
            <div class='members-input-container'>
              ${this.input.html()}
              <button>
                ${this.magnifyGlass.html()}
              </button>
            </div>
          </div>
          ${this.table ? this.table.html() : ''}
        </div>
        <div class='pagination-container'>
          ${this.pagination ? this.pagination.html() : ''}
        </div>
      </div>
    `;
    if (this.pagination) {
      this.pagination.render();
    }
  }
}
