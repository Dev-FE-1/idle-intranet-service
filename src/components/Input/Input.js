import './Input.css';

export default class Input {
  constructor({ placeholder, type, id, readOnly }) {
    this.placeholder = placeholder || '';
    this.type = type || 'text'; // text, password, email, date....
    this.id = id; // input id 설정 (label 연결 용도)
    this.readOnly = readOnly ? 'read-only' : 'default'; // true, false
  }

  html() {
    return `
      <input type=${this.type} class='input input-${this.readOnly}' id=${this.id} placeholder=${this.placeholder}>
    `;
  }
}
