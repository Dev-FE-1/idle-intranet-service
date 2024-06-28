import './Button.css';

export default class Button {
  constructor({ type, size, content }) {
    this.type = type || 'primary'; // primary, secondary, tertiary, ghost, text
    this.size = size || 'default'; // small
    this.content = content || '';
  }

  html() {
    return `
      <button class='button btn-${this.size} btn-${this.type}'>${this.content}</button>
    `;
  }
}
