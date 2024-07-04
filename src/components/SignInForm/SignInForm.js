import Input from '../Input/Input.js';
import Button from '../Button/Button.js';
import './SignInForm.css';
import AuthService from '../Auth/AuthService.js';

export default class SignInForm {
  constructor() {
    this.EmailInput = new Input({
      id: 'signin_email',
      type: 'email',
      placeholder: '이메일',
      required: true,
    });
    this.PasswordInput = new Input({
      id: 'signin_password',
      type: 'password',
      placeholder: '비밀번호',
      required: true,
    });
    this.Button = new Button({
      type: 'submit',
      variant: 'tertiary',
      content: '로그인',
      disabled: true,
    });
    this.authService = new AuthService();
    this.isValidEmail = false;
    this.isValidPassword = false;
    this.email = '';
    this.password = '';
  }

  handleForm = (event) => {
    event.preventDefault();

    this.email = document.getElementById('signin_email').value;
    this.password = document.getElementById('signin_password').value;

    this.isValidEmail = this.validateEmail(this.email);
    this.isValidPassword = this.validatePassword(this.password);

    if (!this.isValidEmail || !this.isValidPassword) {
      document.getElementById('signin_email').value = '';
      document.getElementById('signin_password').value = '';
      document.querySelector('.alert-message').classList.add('show');
    } else {
      this.authService.login(this.email, this.password);
    }
  };

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    return password.length >= 8 && password.length <= 30;
  }

  handleInput = () => {
    const emailValue = document.getElementById('signin_email').value;
    const passwordValue = document.getElementById('signin_password').value;
    const buttonElement = document.querySelector('.button.btn-tertiary');

    if (emailValue.length > 0 && passwordValue.length > 0) {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove('disabled');
    } else {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add('disabled');
    }
  };

  html() {
    return `
      <form id="signin_form">
        ${this.EmailInput.html()}
        ${this.PasswordInput.html()}
        <p class="alert-message">아이디 또는 비밀번호를 잘못 입력했습니다.</br>입력하신 내용을 다시 확인해주세요.</p>
        ${this.Button.html()}
      </form>
    `;
  }

  setEventListeners() {
    const emailInput = document.getElementById('signin_email');
    const passwordInput = document.getElementById('signin_password');
    const buttonElement = document.querySelector('.button.btn-tertiary');
    buttonElement.classList.add('disabled');
    emailInput.addEventListener('input', this.handleInput);
    passwordInput.addEventListener('input', this.handleInput);
    buttonElement.addEventListener('click', this.handleForm);
  }
}

