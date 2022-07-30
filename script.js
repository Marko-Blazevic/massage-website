const forms = document.querySelectorAll('.validate-form');
const inputs = document.querySelectorAll('.input');
const inputFields = document.querySelectorAll('.input-field');
const invalidFeedbacks = document.querySelectorAll('.invalid-feedback');
const textareaInputField = document.querySelector('.textarea-input-field');

window.addEventListener('load', function () {
  inputFields.forEach((input) => {
    input.value = '';
  });
});
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

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    'submit',
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      inputs.forEach((input) => {
        const inputField = input.querySelector('.input-field');
        const invalidFeedback = input.querySelector('.invalid-feedback');

        if (inputField.value.trim() === '') {
          inputField.classList.add('error-input');
          invalidFeedback.style.display = 'block';
        }
      });

      textareaInputField.classList.remove('error-input');

      const emailInput = document.querySelector('.email-input');
      const emailInputField = document.getElementById('email');
      const emailInputLabel = emailInput.querySelector('label');
      const emailInvalidFeedback = emailInput.querySelector(
        '.email-invalid-feedback'
      );
      if (
        !emailInputField.value.includes('@') &&
        !emailInputField.value.includes('.') &&
        !emailInputField.classList.contains('error-input')
      ) {
        emailInputField.classList.add('error-input');
        emailInvalidFeedback.style.display = 'block';
      }
      emailInputField.addEventListener('blur', () => {
        if (
          emailInputField.value !== '' &&
          emailInputField.value.includes('@') &&
          emailInputField.value.includes('.')
        ) {
          emailInputLabel.classList.add('used-field');
          emailInputField.classList.remove('error-input');
          emailInvalidFeedback.style.display = 'none';
        }
      });
    },
    false
  );
});
