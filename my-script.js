$('table tr').click(function () {
  window.location = $(this).data('href');
});

if (document.location.hash) {
  setTimeout(function () {
    window.scrollTo(window.scrollX, window.scrollY - 66);
  }, 10);
}

$('.click-offset').click(function () {
  setTimeout(function () {
    window.scrollTo(window.scrollX, window.scrollY - 66);
  }, 10);
});
