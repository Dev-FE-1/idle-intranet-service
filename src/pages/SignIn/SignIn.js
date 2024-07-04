import SignInForm from '../../components/SignInForm/SignInForm.js';
import logo from '../../../public/images/logo.svg';
import dashboardImage from '../../../public/images/dashboard.png';
import './SignIn.css';

export default class SignIn {
  constructor() {
    this.$container = document.querySelector('#app');
    this.Form = new SignInForm();
  }

  render() {
    this.$container.innerHTML = `
      <div class="signin-container">
        <header>
          <div class="logo-container">
            <div class="logo">
              <img src="${logo}" alt="" />
            </div>
            <h1 class="logo-title">Cube.IT</h1>
          </div>
        </header>
        <div class="desktop-only signin-bg">
          <img src="${dashboardImage}" alt="로그인 페이지 대시보드" />
        </div>
        <section class="signin-section">
          <div class="signin-wrapper">
            <h2 class="signin-title">
              <div class="hand-icon">👋</div>
              <p class="title-message">큐브잇 인트라넷에 오신 걸 환영합니다!</p>
            </h2>
            <div class='form-wrapper'>
              ${this.Form.html()}
            </div>
            <p class="password-help-message">비밀번호를 잊어버리셨다면, IT 지원팀으로 문의해 주세요.</p>
            <p class="password-help-message">IT 지원팀 연락처: cubeit.it@cubeit.com</p>
          </div>
        </section>
      </div>
    `;
    this.Form.setEventListeners();
  }
}
