import './Button.css';

export default class Button {
  constructor({ type, variant, size, content, disabled }) {
    this.type = type || 'button'; // HTML button type: 'submit', 'reset', 'button'
    this.variant = variant || 'primary'; // Button style type: 'primary', 'secondary',
    this.size = size || 'default'; // small
    this.content = content || '';
    this.disabled = disabled || '';
  }

  html() {
    return `
      <button class='button btn-${this.size} btn-${this.variant}' type='${this.type}' ${this.disabled ? 'disabled' : ''}>${this.content}</button>
    `;
  }
}
