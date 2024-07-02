import Input from '../Input/Input.js';
import Button from '../Button/Button.js';
import './SignInForm.css';

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
      type: 'tertiary',
      content: '로그인',
    });
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
      document.querySelector('.alert-message').classList.add('show')
    }

    if (this.isValidEmail && this.isValidPassword) {
      this.login();
    }
  };

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    return password.length >= 8 && password.length <= 30;
  }

  login() {
    fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = '/';
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  

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

  render() {
    const buttonElement = document.querySelector('.button.btn-tertiary');
    if (buttonElement) {
      buttonElement.addEventListener('click', this.handleForm);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const signInForm = new SignInForm();
  signInForm.render();
});
