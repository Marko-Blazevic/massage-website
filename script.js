// const form = document.querySelector('form');
// console.log(form);
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
// });

const forms = document.querySelectorAll('.validate-form');

// const validateForm = () => {};
// Loop over them and prevent submission
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
