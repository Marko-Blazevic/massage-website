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

const masaze = gsap.utils.toArray('.slide-up');
gsap.registerPlugin(ScrollTrigger);
masaze.forEach((masaza) => {
  gsap.from(masaza, {
    scrollTrigger: masaza,
    y: 100,
    duration: 1,
  });
});
