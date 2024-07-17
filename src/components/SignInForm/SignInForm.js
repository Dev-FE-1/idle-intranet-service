import Input from '../Input/Input.js';
import Button from '../Button/Button.js';
import './SignInForm.css';
import { login } from '../API/AuthService.js';

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
      variant: 'primary',
      content: '로그인',
      disabled: true,
    });
    this.isValidEmail = false;
    this.isValidPassword = false;
  }

  handleForm = (event) => {
    event.preventDefault();

    this.email = document.getElementById('signin_email').value;
    this.password = document.getElementById('signin_password').value;

    this.isValidEmail = this.validateEmail();
    this.isValidPassword = this.validatePassword();

    if (!this.isValidEmail) {
      this.showErrorMessage('이메일 형식이 올바른지 확인해 주시기 바랍니다.');
    } else if (!this.isValidPassword) {
      this.showErrorMessage(
        '비밀번호는 8자 이상, 30자 이하로 작성해 주시기 바랍니다.',
      );
    } else {
      login(this.email, this.password, this.showErrorMessage);
    }
    document.querySelector('.button.btn-primary').removeAttribute('disabled');
  };

  validateEmail() {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(this.email).toLowerCase());
  }

  validatePassword() {
    return this.password.length >= 8 && this.password.length <= 30;
  }

  // eslint-disable-next-line class-methods-use-this
  handleInput = (e) => {
    // 돔에 접근해서 value를 가져오지 않고, event를 통해 value를 가져올 수 있을까요?
    const emailValue = document.getElementById('signin_email').value;
    const passwordValue = document.getElementById('signin_password').value;
    const button = document.querySelector('.button.btn-primary');
    if (emailValue.length > 0 && passwordValue.length > 0) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  };

  showErrorMessage = (message) => {
    const alertMessage = document.querySelector('.alert-message');
    alertMessage.textContent = message;
    alertMessage.classList.add('show');
    this.clearInputs();
  };

  // eslint-disable-next-line class-methods-use-this
  clearInputs = () => {
    document.getElementById('signin_email').value = '';
    document.getElementById('signin_password').value = '';
  };

  html() {
    return `
      <form id="signin_form" class="signin-form">
        ${this.EmailInput.html()}
        ${this.PasswordInput.html()}
        <p class="alert-message"></p>
        ${this.Button.html()}
      </form>
    `;
  }

  setEventListeners() {
    const emailInput = document.getElementById('signin_email');
    const passwordInput = document.getElementById('signin_password');
    const buttonElement = document.querySelector('.button.btn-primary');
    emailInput.addEventListener('input', this.handleInput);
    // change이벤트가 아닌 input이벤트를 선택한 이유가 있나요
    passwordInput.addEventListener('input', this.handleInput);
    buttonElement.addEventListener('click', this.handleForm);
  }
}
