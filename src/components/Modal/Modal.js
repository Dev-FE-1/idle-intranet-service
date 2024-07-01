import Button from '../Button/Button.js';
import './Modal.css';

export default class Modal {
  constructor({ title, mainContent, buttonContent }) {
    this.title = title || '제목';
    this.mainContent = mainContent || '메인 컨텐츠';
    this.buttonContent = buttonContent || 'Click me';
    this.submitButton = new Button({ content: 'click me' });
    this.closeButton = new Button({ type: 'text', content: '취소' });
  }

  html() {
    return `
      <div class='modal-bg'></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>${this.title}</h2>
        </div>
        <div class="modal-body">
          <div class="modal-main-content">
            ${this.mainContent}
          </div>
          <div class="modal-footer">
            ${this.submitButton.html()}
            ${this.closeButton.html()}
          </div>
        </div>
      </div>
    `;
  }
}
