import './Input.css';

export default class Input {
  constructor({
    placeholder = '',
    type = 'text',
    id = '',
    readOnly = false,
    required = false,
  }) {
    this.placeholder = placeholder;
    this.type = type;
    this.id = id;
    this.readOnly = readOnly;
    this.required = required;
  }

  html() {
    return `
      <input 
        type='${this.type}' 
        class='input' 
        id='${this.id}' 
        placeholder='${this.placeholder}' 
        ${this.readOnly ? 'readonly' : ''}
        required=${this.required}
      >
    `;
  }
}
