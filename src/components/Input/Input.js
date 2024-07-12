import './Input.css';

export default class Input {
  constructor({ placeholder, type, id, readOnly, name, value }) {
    this.placeholder = placeholder || '';
    this.type = type || 'text'; // text, password, email, date....
    this.id = id; // input id 설정 (label 연결 용도)
    this.readOnly = readOnly ? 'read-only' : 'default'; // true, false
    this.name = name || this.id;
    this.value = value || ''; // input value 설정
  }

  html() {
    return `
      <input type='${this.type}' class='input input-${this.readOnly}' id='${this.id}' value='${this.value}' ${this.readOnly ? 'readOnly' : ''} placeholder='${this.placeholder}'>
    `;
  }
}
