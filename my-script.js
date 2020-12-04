$(document).ready(function () {
  $('table tr').click(function () {
    window.location = $(this).data('href');
  });
});

(function () {
  if (document.location.hash) {
    setTimeout(function () {
      window.scrollTo(window.scrollX, window.scrollY - 66);
    }, 10);
  }
})();
