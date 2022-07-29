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
        const inputLabel = input.querySelector('.input-label');

        if (inputField.value === '') {
          inputField.classList.add('error-input');
          invalidFeedback.style.display = 'block';
        }

        inputField.addEventListener('blur', () => {
          if (inputField.value !== '') {
            inputLabel.classList.add('used-field');
            inputField.classList.remove('error-input');
            invalidFeedback.style.display = 'none';
          }
        });
      });
      textareaInputField.classList.remove('error-input');
    },
    false
  );
});

// inputs.forEach((input) => {
//   const inputField = input.querySelector('.input-field');
//   const inputLabel = input.querySelector('.input-label');
//   const invalidFeedback = input.querySelector('.invalid-feedback');
//   inputField.addEventListener('blur', () => {
//     if (inputField.value !== '') {
//       inputLabel.classList.add('used-field');
//       inputField.classList.remove('error-input');
//       invalidFeedback.style.display = 'none';
//     }
//   });
// });
