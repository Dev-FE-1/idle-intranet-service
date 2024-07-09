import Icon from '../Icon/Icon.js';
import IconButton from '../Button/IconButton.js';
import Modal from '../Modal/Modal.js';
import { COLORS } from '../../utils/constants.js';
import { edit } from '../../utils/icons.js';
import EditProfileForm from './EditProfileForm.js';

export default class EditProfileButton {
  constructor({ container, member }) {
    this.$container = container;
    this.member = member;
    this.icon = new Icon({
      svg: edit,
      options: { color: COLORS.DARKEST_GRAY },
    });
    this.EditButton = new IconButton({
      icon: this.icon,
    });
    this.EditProfileForm = new EditProfileForm({ member: this.member });
  }

  onSubmit = () => {
    console.log('submit');
  };

  onClickEditButton = () => {
    this.EditProfileForm.renderInitialData();
    this.Modal.open();
  };

  setModal() {
    this.Modal = new Modal({
      title: '프로필 수정',
      mainContent: this.EditProfileForm.html(),
      buttonContent: '수정',
      onSubmit: this.onSubmit,
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
