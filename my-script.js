$('table tr').click(function () {
  window.location = $(this).data('href');
});

// href when clicked on table row
if (document.location.hash) {
  setTimeout(function () {
    window.scrollTo(window.scrollX, window.scrollY - 66);
  }, 10);
}

// href when clicked on nav dropdow Usluge
$('.click-offset').click(function () {
  setTimeout(function () {
    window.scrollTo(window.scrollX, window.scrollY - 75);
  }, 10);
});

gsap.registerPlugin(ScrollTrigger);

const slideUp = gsap.utils.toArray('.slide-up');
slideUp.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: 200,
    duration: 1,
    opacity: 0.2,
  });
});

const slideLeft = gsap.utils.toArray('.slide-left');
slideLeft.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -200,
    duration: 1,
    opacity: 0.2,
  });
});

const slideRight = gsap.utils.toArray('.slide-right');
slideRight.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 200,
    duration: 1,
    opacity: 0.2,
  });
});

gsap.to('.logo', { rotation: 360, duration: 1, delay: 1 });
