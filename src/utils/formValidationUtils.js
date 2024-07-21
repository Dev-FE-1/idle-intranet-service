function validateInput(input) {
  const parent = input.parentElement;
  if (input.value.trim() === '') {
    parent.classList.add('input-error');
    return false;
  }
  parent.classList.remove('input-error');
  return true;
}

function updateErrorState(timeSelected, hourSelected) {
  const timeField = document.querySelector('.time-field');
  if (timeSelected !== '00:00' && hourSelected !== '0시간') {
    timeField.classList.remove('input-error');
  } else {
    timeField.classList.add('input-error');
  }
}

function initializeValidationListeners() {
  const textarea = document.getElementById('vacationReason');
  const selectElements = document.querySelectorAll('.select-custom');

  textarea.addEventListener('input', () => {
    if (textarea.value.trim() !== '') {
      textarea.parentElement.classList.remove('input-error');
    }
  });

  selectElements.forEach((select) => {
    select.addEventListener('change', () => {
      if (select.value.trim() !== '') {
        select.parentElement.classList.remove('input-error');
      }
    });
  });
}

export { validateInput, updateErrorState, initializeValidationListeners };
