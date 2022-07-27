const forms = document.querySelectorAll('.validate-form');
const inputs = document.querySelectorAll('.input');

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    'submit',
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    },
    false
  );
});

inputs.forEach((input) => {
  const inputField = input.querySelector('.input-field');
  const inputLabel = input.querySelector('.input-label');
  inputField.addEventListener('blur', () => {
    if (inputField.value !== '') {
      inputLabel.classList.add('used-field');
    }
  });
});
