import './Button.css';

export default class Button {
  constructor({ type, variant, size, content }) {
    this.type = type || 'button'; // HTML button type: 'submit', 'reset', 'button'
    this.variant = variant || 'primary'; // Button style type: 'primary', 'secondary',
    this.size = size || 'default'; // small
    this.content = content || '';
  }

  html() {
    return `
      <button class='button btn-${this.size} btn-${this.type}'>${this.content}</button>
    `;
  }
}
