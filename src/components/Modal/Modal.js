import Button from '../Button/Button.js';
import './Modal.css';

export default class Modal {
  constructor({ title, mainContent, buttonContent, onSubmit }) {
    this.title = title || '';
    this.mainContent = mainContent || '메인 컨텐츠';
    this.buttonContent = buttonContent || 'Click me';
    this.submitButton = new Button({ content: this.buttonContent });
    this.closeButton = new Button({ variant: 'text', content: '취소' });
    this.onSubmit = onSubmit;
  }

  open() {
    this.$container.classList.add('active');
  }

  close() {
    this.$container.classList.remove('active');
  }

  setEventListeners() {
    const $submitButton = this.$container.querySelector(
      '.submit-button button',
    );
    const $closeButton = this.$container.querySelector('.close-button button');
    const $modalBackground = this.$container.querySelector('.modal-bg');

    $submitButton.addEventListener('click', () => this.onSubmit());
    $closeButton.addEventListener('click', () => this.close());
    $modalBackground.addEventListener('click', () => this.close());
  }

  render() {
    this.$container = document.querySelector('.modal-container');
    this.setEventListeners();
  }

  html() {
    return /* HTML */ `
      <div class="modal-container">
        <div class="modal-bg"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>${this.title}</h2>
          </div>
          <div class="modal-body">
            <div class="modal-main-content">${this.mainContent}</div>
            <div class="modal-footer">
              <div class="submit-button">${this.submitButton.html()}</div>
              <div class="close-button">${this.closeButton.html()}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
