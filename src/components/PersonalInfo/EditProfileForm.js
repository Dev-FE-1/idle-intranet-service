import IconButton from '../Button/IconButton.js';
import Icon from '../Icon/Icon.js';
import Input from '../Input/Input.js';
import { camera } from '../../utils/icons.js';
import './EditProfileForm.css';
import { generateRandomProfile } from '../../utils/profileImage.js';

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

  getFormData() {
    return {
      profileImage: this.$image.src,
      phoneNumber: this.$phoneNumberInput.value,
      address: this.$addressInput.value,
    };
  }

  setRandomImage() {
    this.newImage = generateRandomProfile();
    this.$image.src = this.newImage;
  }

  setUserImage() {
    this.setFileInput();
    this.$fileInput.click();
  }

  onFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  setFileInput() {
    this.$fileInput = document.createElement('input');
    this.$fileInput.type = 'file';
    this.$fileInput.accept = 'image/*';
    this.$fileInput.addEventListener('change', (event) =>
      this.onFileInputChange(event),
    );
  }

  setEventListeners() {
    this.$randomImageButton.addEventListener('click', () =>
      this.setRandomImage(),
    );
    this.$selectImageButton.addEventListener('click', () => {
      this.setUserImage();
    });
  }

  renderInitialData() {
    this.$image.src = this.member.profileImage;
    this.$phoneNumberInput.value = this.member.phoneNumber;
    this.$addressInput.value = this.member.address;
  }

  render() {
    this.$image = document.querySelector('.edit-profile-form .profile-image');
    this.$randomImageButton = document.querySelector(
      '.edit-profile-form .random-profile-image-button',
    );
    this.$phoneNumberInput = document.querySelector('input#phone_number_input');
    this.$addressInput = document.querySelector('input#address_input');
    this.$selectImageButton = document.querySelector(
      '.edit-image-button-container button',
    );

    this.renderInitialData();
    this.setFileInput();
    this.setEventListeners();
  }

  html() {
    return /* HTML */ `<form class="edit-profile-form">
      <div class="edit-profile-image-container">
        <div class="profile-image-container">
          <img
            src="${this.member.profileImage}"
            alt="${this.member.name}"
            class="profile-image"
          />
        </div>
        <div class="edit-image-button-container">${this.Button.html()}</div>
      </div>
      <button class="random-profile-image-button">기본 이미지 설정</button>
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
