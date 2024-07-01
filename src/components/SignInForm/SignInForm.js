import Input from '../Input/Input.js';
import Button from '../Button/Button.js';

export default class SignInForm {
  constructor() {
    this.EmailInput = new Input({
      id: 'signin_email',
      type: 'email',
      placeholder: '이메일',
    });
    this.PasswordInput = new Input({
      id: 'signin_password',
      type: 'password',
      placeholder: '비밀번호',
    });
    this.Button = new Button({
      type: 'submit',
      variant: 'tertiary',
      content: '로그인',
    });
    this.isValidEmail = true;
    this.isValidPassword = true;
  }

  html() {
    return `
      <form id="signin_form">
        ${this.EmailInput.html()}
        ${!this.isValidEmail ? '<p class="alert-message">이메일 주소가 올바르지 않습니다.</p>' : ''}
        ${this.PasswordInput.html()}
        ${!this.isValidPassword ? '<p class="alert-message">비밀번호는 최소 8자 이상이어야 합니다.</p>' : ''}
        ${this.Button.html()}
      </form>
    `;
  }
}
