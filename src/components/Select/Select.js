import Icon from '../Icon/Icon.js';
import { COLORS } from '../../utils/constants.js';
import { chevronDown } from '../../utils/icons.js';
import './Select.css';

export default class Select {
  static instanceCounter = 0;

  static openDropdown = null;

  constructor({
    contents,
    onSelect,
    excludeFirst = false,
    roundedBorder = false,
    small = false,
  }) {
    if (typeof onSelect !== 'function') {
      throw new Error(
        'onSelect callback must be provided and must be a function',
      );
    }

    this.id = `select-${Select.instanceCounter}`;
    Select.instanceCounter += 1;
    this.contents = contents || [];
    this.onSelect = onSelect;
    this.dropdownVisible = false;
    this.roundedBorder = roundedBorder;
    this.small = small;
    this.chevronDown = new Icon({
      svg: chevronDown,
      options: { size: '18px', color: COLORS.DARK_GRAY },
    });

    this.filteredContents = excludeFirst ? contents.slice(1) : contents;
    this.selectedItem = this.contents[0] || '';
  }

  toggleDropdown = () => {
    if (Select.openDropdown && Select.openDropdown !== this) {
      Select.openDropdown.closeDropdown();
    }

    this.dropdownVisible = !this.dropdownVisible;
    const ul = this.dropdownButton.nextElementSibling;
    ul.style.display = this.dropdownVisible ? 'block' : 'none';
    this.dropdownButton.classList.toggle('dropdown-open', this.dropdownVisible);

    if (this.dropdownVisible) {
      Select.openDropdown = this;
    } else {
      Select.openDropdown = null;
    }
  };

  closeDropdown = () => {
    this.dropdownVisible = false;
    const ul = this.dropdownButton.nextElementSibling;
    ul.style.display = 'none';
    this.dropdownButton.classList.remove('dropdown-open');
    Select.openDropdown = null;
  };

  updateSelection = (content) => {
    this.onSelect(content);
    this.selectedItem = content;
    this.dropdownButton.innerHTML = `${content} ${this.chevronDown.html()}`;
    this.closeDropdown();
  };

  getSelectedItem() {
    return this.selectedItem;
  }

  html() {
    const buttonClass = this.roundedBorder
      ? 'dropdown-btn rounded-border'
      : 'dropdown-btn underlined';
    const dropdownClass = this.small ? 'dropdown-menu small' : 'dropdown-menu';

    return /* HTML */ `
      <div class="${dropdownClass}" id="${this.id}">
        <button class="${buttonClass}">
          ${this.selectedItem} ${this.chevronDown.html()}
        </button>
        <ul class="dropdown-list">
          ${this.filteredContents
            .map((content) => `<li class="dropdown-item">${content}</li>`)
            .join('')}
        </ul>
      </div>
    `;
  }

  setEventListeners() {
    const dropdownMenu = document.getElementById(this.id);
    const dropdownButton = dropdownMenu.querySelector('.dropdown-btn');
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    this.dropdownButton = dropdownButton;

    dropdownButton.addEventListener('click', this.toggleDropdown);
    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener('click', () => {
        const content = dropdownItem.textContent;
        this.updateSelection(content);
      });
    });
  }
}
