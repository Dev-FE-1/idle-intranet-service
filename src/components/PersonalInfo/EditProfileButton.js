import Icon from '../Icon/Icon.js';
import IconButton from '../Button/IconButton.js';
import Modal from '../Modal/Modal.js';
import { COLORS } from '../../utils/constants.js';
import { edit, loader } from '../../utils/icons.js';
import EditProfileForm from './EditProfileForm.js';
import { updateUserProfile } from '../../api/endpoints/user.js';
import { storeInstance } from '../Store.js';
import {
  cityRegexp,
  districtRegexp,
  neighborhoodRegexp,
  phoneRegexp,
} from '../../utils/regexp.js';

export default class EditProfileButton {
  constructor({ container, member }) {
    this.$container = container;
    this.store = storeInstance;
    this.member = member;
    this.Icon = new Icon({
      svg: edit,
      options: { color: COLORS.DARKEST_GRAY },
    });
    this.EditButton = new IconButton({
      icon: this.Icon,
    });
    this.EditProfileForm = new EditProfileForm({ member: this.member });
    this.Loader = new Icon({
      svg: loader,
      options: { color: '#fff' },
    });
  }

  updateMember({ profileImage, phoneNumber, address }) {
    this.member.profileImage = profileImage;
    this.member.phoneNumber = phoneNumber;
    this.member.address = address;
  }

  async updateProfilePage({ profileImage, phoneNumber, address }) {
    const user = await this.store.getUser();
    if (this.member.employeeNumber === user.employeeNumber) {
      const $headerAvatar = document.querySelector(
        '.header-container .profile-img',
      );
      $headerAvatar.src = profileImage;
    }

    const $profileImage = document.querySelector(
      '.personal-info-section .profile-img',
    );
    $profileImage.src = profileImage;

    const $subtitles = document.querySelectorAll('.personal-detail-subtitle');
    /* eslint-disable no-param-reassign */
    $subtitles.forEach(($subtitle) => {
      if ($subtitle.textContent === '전화번호') {
        $subtitle.nextElementSibling.innerText = phoneNumber;
      } else if ($subtitle.textContent === '자택 주소') {
        $subtitle.nextElementSibling.innerText = address;
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  isValidAddress(parts) {
    const hasPart = (regexp) => parts.some((part) => regexp.test(part));

    const hasCity = hasPart(cityRegexp);
    const hasDistrict = hasPart(districtRegexp);
    const hasNeighborhood = hasPart(neighborhoodRegexp);

    return hasCity && hasDistrict && hasNeighborhood;
  }

  // eslint-disable-next-line class-methods-use-this
  verifyFormData(phoneNumber, address) {
    const isValidPhoneNumber = phoneRegexp.test(phoneNumber);

    const parts = address.split(' ');
    if (parts.length < 3) {
      return [isValidPhoneNumber, false];
    }

    return [isValidPhoneNumber, this.isValidAddress(parts)];
  }

  async submitUserProfile(formData) {
    const $submitButton = document.querySelector(
      '#edit-profile-modal .btn-primary',
    );
    $submitButton.innerHTML = this.Loader.html();
    const response = await updateUserProfile({
      employeeNumber: this.member.employeeNumber,
      profileData: formData,
    });

    if (response.status !== 'OK') {
      console.log('프로필 수정을 실패했습니다.');
      return;
    }
    this.updateProfilePage(formData);
    this.updateMember(formData);
    this.Modal.close();
    $submitButton.innerHTML = '수정';
  }

  async onSubmit() {
    const formData = this.EditProfileForm.getFormData();
    const [isValidPhoneNumber, isValidAddress] = this.verifyFormData(
      formData.phoneNumber,
      formData.address,
    );
    this.EditProfileForm.showAlertMessage(!isValidPhoneNumber, !isValidAddress);
    if (isValidPhoneNumber && isValidAddress) {
      await this.submitUserProfile(formData);
    }
  }

  onClickEditButton = () => {
    this.EditProfileForm.renderInitialData();
    this.Modal.open();
  };

  setModal() {
    this.Modal = new Modal({
      title: '프로필 수정',
      mainContent: this.EditProfileForm.html(),
      buttonContent: '수정',
      onSubmit: this.onSubmit.bind(this),
      id: 'edit-profile-modal',
    });
  }

  setEventListener() {
    this.$button = this.$container.querySelector(
      '.edit-button-container button',
    );
    this.$button.addEventListener('click', this.onClickEditButton);
  }

  render() {
    this.setModal();
    this.$container.innerHTML = /* HTML */ `
      <div class="edit-button-container">${this.EditButton.html()}</div>
      <div class="edit-profile-modal-container">${this.Modal.html()}</div>
    `;

    this.EditProfileForm.render();
    this.Modal.render();
    this.setEventListener();
  }
}
