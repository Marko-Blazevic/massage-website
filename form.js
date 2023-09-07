const forms = document.querySelectorAll('.validate-form');
const inputs = document.querySelectorAll('.input');
const inputFields = document.querySelectorAll('.input-field');
const nameInput = document.getElementById('name');
const phoneInputField = document.getElementById('phone-number');
const phoneInvalidFeedback = document.querySelector('.phone-invalid-feedback');
const emailInput = document.getElementById('email');
const emailInputField = document.getElementById('email');
const emailInputLabel = document.querySelector('label');
const emailInvalidFeedback = document.querySelector('.email-invalid-feedback');
const textareaInputField = document.querySelector('.textarea-input-field');
const scheduleMassage = document.querySelector('.on-click');

window.addEventListener('load', function () {
  forms.forEach((form) => {
    form.reset();
  });
});

if (scheduleMassage !== null) {
  scheduleMassage.addEventListener('click', function () {
    window.open('calendar.html', '_blank');
  });
}

const checkInputsValues = () => {
  inputs.forEach((input) => {
    const inputField = input.querySelector('.input-field');
    const invalidFeedback = input.querySelector('.invalid-feedback');
    if (inputField.value.trim() === '') {
      inputField.classList.add('error-input');
      invalidFeedback.style.display = 'block';
    }
  });
  textareaInputField.classList.remove('error-input');
};

inputs.forEach((input) => {
  const field = input.querySelector('.input-field');
  const label = input.querySelector('.input-label');
  const invalid = input.querySelector('.invalid-feedback');
  field.addEventListener('blur', () => {
    if (field.value.trim() !== '') {
      label.classList.add('used-field');
      field.classList.remove('error-input');
      invalid.style.display = 'none';
    }
  });
});

const checkPhoneInputValue = () => {
  if (isNaN(phoneInputField.value)) {
    phoneInputField.classList.add('error-input');
    phoneInvalidFeedback.style.display = 'block';
    return false;
  } else {
    phoneInputField.classList.remove('error-input');
    phoneInvalidFeedback.style.display = 'none';
    return true;
  }
};

const checkEmailInputValue = () => {
  if (
    !emailInputField.value.includes('@') ||
    !emailInputField.value.includes('.')
  ) {
    emailInputField.classList.add('error-input');
    emailInvalidFeedback.style.display = 'block';
    return false;
  } else {
    emailInputLabel.classList.add('used-field');
    emailInputField.classList.remove('error-input');
    emailInvalidFeedback.style.display = 'none';
    return true;
  }
};

phoneInputField.addEventListener('blur', () => {
  checkPhoneInputValue();
});

emailInputField.addEventListener('blur', () => {
  checkEmailInputValue();
});

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    'submit',
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (
        nameInput.value.trim() !== '' &&
        checkPhoneInputValue() === true &&
        checkEmailInputValue() === true
      ) {
        console.log('form je OK');
      } else {
        checkInputsValues();
      }
    },
    false
  );
});
