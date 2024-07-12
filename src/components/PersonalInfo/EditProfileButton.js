import Icon from '../Icon/Icon.js';
import IconButton from '../Button/IconButton.js';
import Modal from '../Modal/Modal.js';
import { COLORS } from '../../utils/constants.js';
import { edit, loader } from '../../utils/icons.js';
import EditProfileForm from './EditProfileForm.js';
import { updateUserProfile } from '../../api/endpoints/user.js';
import { storeInstance } from '../Store.js';

export default class EditProfileButton {
  constructor({ container, member }) {
    this.$container = container;
    this.store = storeInstance;
    this.member = member;
    this.icon = new Icon({
      svg: edit,
      options: { color: COLORS.DARKEST_GRAY },
    });
    this.EditButton = new IconButton({
      icon: this.icon,
    });
    this.EditProfileForm = new EditProfileForm({ member: this.member });
    this.loader = new Icon({
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
  verifyFormData(phoneNumber, address) {
    const phoneRegex =
      /^\+?(\d{1,3})?[-. ]?(\d{1,4})[-. ]?(\d{3,4})[-. ]?(\d{4})$/;
    const cityRegex = /^[가-힣]{1,5}시$/;
    const districtRegex = /^[가-힣]{1,5}구$/;
    const neighborhoodRegex = /^[가-힣0-9]{1,10}(동|로|길)$/;

    const isValidPhoneNumber = phoneRegex.test(phoneNumber);

    const parts = address.split(' ');
    if (parts.length < 3) {
      return [isValidPhoneNumber, false];
    }

    const hasCity = parts.some((part) => cityRegex.test(part));
    const hasDistrict = parts.some((part) => districtRegex.test(part));
    const hasNeighborhood = parts.some((part) => neighborhoodRegex.test(part));

    const isValidAddress = hasCity && hasDistrict && hasNeighborhood;

    return [isValidPhoneNumber, isValidAddress];
  }

  async onSubmit() {
    const formData = this.EditProfileForm.getFormData();
    const [isValidPhoneNumber, isValidAddress] = this.verifyFormData(
      formData.phoneNumber,
      formData.address,
    );
    this.EditProfileForm.showAlertMessage(!isValidPhoneNumber, !isValidAddress);
    if (isValidPhoneNumber && isValidAddress) {
      const $submitButton = document.querySelector(
        '#edit-profile-modal .btn-primary',
      );
      $submitButton.innerHTML = this.loader.html();
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
