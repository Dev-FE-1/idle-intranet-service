import './Button.css';

export default class Button {
  constructor({
    type = 'button',
    variant = 'primary',
    size = 'default',
    content = '',
    disabled = '',
  }) {
    this.type = type; // HTML button type: 'submit', 'reset', 'button'
    this.variant = variant; // Button style type: 'primary', 'secondary',
    this.size = size; // small
    this.content = content;
    this.disabled = disabled;
  }

  html() {
    return `
      <button class='button btn-${this.size} btn-${this.variant}' type='${this.type}' ${this.disabled ? 'disabled' : ''}>${this.content}</button>
    `;
  }
}
