import { chosenTimeAndMassageData } from './calendar-script.js';
// import { onCalendarLoad } from './calendar-script.js';
import { getAllValuesHandler } from './calendar-script.js';
const inputs = document.querySelectorAll('.input');
// const inputFields = document.querySelectorAll('.input-field');
const nameInput = document.getElementById('name');
const phoneInputField = document.getElementById('phone-number');
const phoneInvalidFeedback = document.querySelector('.phone-invalid-feedback');
const emailInput = document.getElementById('email');
const emailInputField = document.getElementById('email');
const emailInputLabel = document.querySelector('label');
const emailInvalidFeedback = document.querySelector('.email-invalid-feedback');
const textareaInputField = document.querySelector('.textarea-input-field');
const form = document.querySelector('.form');

window.addEventListener('load', function () {
  form.reset();
});
console.log(form);

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
const sendConfirmationEmail = () => {
  const selectedDate = getAllValuesHandler[0];
  const selectedTime = getAllValuesHandler[1];
  const selectedMassage = getAllValuesHandler[2];
  console.log(selectedDate, selectedTime, selectedMassage);
};
const postSelectedTimeAndMassage = async () => {
  try {
    const response = await fetch(
      'https://calendar-schedule-time-default-rtdb.firebaseio.c2om/schedule.json',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chosenTimeAndMassageData),
      }
    );
    alert('Your data has been posted.');
    window.close();
    if (!response.ok) {
      throw new Error('Could not POST data to server.');
    }
  } catch (error) {
    console.log(error.message);
    alert(
      'Sorry, we could not post your data to server. Please try again later.'
    );
  }
};

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
      postSelectedTimeAndMassage();
    } else {
      checkInputsValues();
    }
  },
  false
);
