import Container from '../../components/Container.js';
import Title from '../../components/Title/Title.js';
import Input from '../../components/Input/Input.js';
import Table from '../../components/Table/Table.js';
import { COLORS, PATH_TITLE } from '../../utils/constants.js';
import './Members.css';
import Icon from '../../components/Icon/Icon.js';
import { magnifyingGlass } from '../../utils/icons.js';
import Pagination from '../../components/Pagination/Pagination.js';

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
    this.input = new Input({ placeholder: '이름을 입력하세요' });
    this.table = new Table({
      headers: ['이름', '직무', '조직', '이메일', '연락처'],
      contents: [
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
        [
          '김직원',
          '프론테엔드 개발자',
          '검색서비스개발팀',
          'hello@gmail.com',
          '02-123-4567',
        ],
      ],
    });
    this.pagination = new Pagination({ currentPage: 5, maxPage: 10 });
  }

  render() {
    this.$container.innerHTML = `
      <div class='members-container'>
        <div class='members-mobile-only'>
          ${this.Title.html()}
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
          ${this.table.html()}
        </div>
        <div class='pagination-container'>
          ${this.pagination.html()}
        </div>
      </div>
    `;
    this.pagination.render();
  }
}
