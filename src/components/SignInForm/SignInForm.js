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

    this.isValidEmail = this.validateEmail();
    this.isValidPassword = this.validatePassword();

    if (!this.isValidEmail) {
      this.showErrorMessage('이메일 형식이 맞는지 확인해주세요!');
    } else if (!this.isValidPassword) {
      this.showErrorMessage('비밀번호의 길이가 너무 짧거나 너무 깁니다!');
    } else {
      this.authService.login(this.email, this.password, this.showErrorMessage);
    }
  };

  validateEmail() {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(this.email).toLowerCase());
  }

  validatePassword() {
    return this.password.length >= 8 && this.password.length <= 30;
  }

  handleInput = () => {
    const emailValue = this.EmailInput.getElement().value;
    const passwordValue = this.PasswordInput.getElement().value;
    const buttonElement = this.Button.getElement();

    if (emailValue.length > 0 && passwordValue.length > 0) {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove('disabled');
    } else {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add('disabled');
    }
  };

  showErrorMessage = (message) => {
    const alertMessage = document.querySelector('.alert-message');
    alertMessage.textContent = message;
    alertMessage.classList.add('show');
    this.clearInputs();
  };

  clearInputs = () => {
    this.EmailInput.getElement().value = '';
    this.PasswordInput.getElement().value = '';
  };

  html() {
    return `
      <form id="signin_form">
        ${this.EmailInput.html()}
        ${this.PasswordInput.html()}
        <p class="alert-message"></p>
        ${this.Button.html()}
      </form>
    `;
  }

  setEventListeners() {
    const emailInput = this.EmailInput.getElement();
    const passwordInput = this.PasswordInput.getElement();
    const buttonElement = this.Button.getElement();
    buttonElement.classList.add('disabled');
    emailInput.addEventListener('input', this.handleInput);
    passwordInput.addEventListener('input', this.handleInput);
    buttonElement.addEventListener('click', this.handleForm);
  }
}
