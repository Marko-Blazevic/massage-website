$(document).ready(function () {
  $('table tr').click(function () {
    window.location = $(this).data('href');
    return false;
  });
});

(function () {
  if (document.location.hash) {
    setTimeout(function () {
      window.scrollTo(window.scrollX, window.scrollY - 66);
    }, 10);
  }
})();

// // Subbmiting the contact form via AJAX request----------------

// $(function () {
//   $('#contact-form').validator();

//   $('#contact-form').on('submit', function (e) {
//     if (!e.isDefaultPrevented()) {
//       var url = 'contact.php';

//       $.ajax({
//         type: 'POST',
//         url: url,
//         data: $(this).serialize(),
//         success: function (data) {
//           var messageAlert = 'alert-' + data.type;
//           var messageText = data.message;

//           var alertBox =
//             '<div class="alert ' +
//             messageAlert +
//             ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
//             messageText +
//             '</div>';
//           if (messageAlert && messageText) {
//             $('#contact-form').find('.messages').html(alertBox);
//             $('#contact-form')[0].reset();
//           }
//         },
//       });
//       return false;
//     }
//   });
// });
