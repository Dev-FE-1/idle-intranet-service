import IconButton from '../Button/IconButton.js';
import Icon from '../Icon/Icon.js';
import Input from '../Input/Input.js';
import { camera } from '../../utils/icons.js';
import './EditProfileForm.css';

export default class EditProfileForm {
  constructor({ member }) {
    this.member = member;
    this.CameraIcon = new Icon({
      svg: camera,
      options: { color: '#fff' },
    });
    this.Button = new IconButton({ icon: this.CameraIcon });
    this.phoneNumberInput = new Input({
      placeholder: '010-0000-0000',
      id: 'phone_number_input',
      name: 'phoneNumber',
    });
    this.addressInput = new Input({
      placeholder: '주소를 입력하세요',
      id: 'address_input',
      name: 'address',
    });
  }

  renderInputs() {
    const $phoneNumberInput = document.querySelector(
      'input#phone_number_input',
    );
    const $addressInput = document.querySelector('input#address_input');

    $phoneNumberInput.value = this.member.phoneNumber;
    $addressInput.value = this.member.address;
  }

  render() {
    this.renderInputs();
  }

  html() {
    return /* HTML */ `<form class="edit-profile-form">
      <div class="edit-profile-image-container">
        <div class="profile-image-container">
          <img src="${this.member.profileImage}" alt="${this.member.name}" />
        </div>
        <div class="edit-image-button-container">${this.Button.html()}</div>
      </div>
      <button class="delete-profile-image-button">이미지 삭제</button>
      <div class="input-container">
        <label for="phone_number_input">전화번호</label>
        ${this.phoneNumberInput.html()}
      </div>
      <div class="input-container">
        <label for="address_input">주소</label>
        ${this.addressInput.html()}
      </div>
    </form>`;
  }
}
