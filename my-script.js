const tableTr = document.querySelectorAll('.table-row');
tableTr.forEach((e) =>
  e.addEventListener(`click`, function (e) {
    window.location = this.getAttribute('data-href');
  })
);

gsap.registerPlugin(ScrollTrigger);

const slideUp = gsap.utils.toArray('.slide-up');
slideUp.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: 50,
    duration: 1,
    opacity: 0.2,
  });
});

const slideLeft = gsap.utils.toArray('.slide-left');
slideLeft.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -50,
    duration: 1,
    opacity: 0.2,
  });
});

const slideRight = gsap.utils.toArray('.slide-right');
slideRight.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 50,
    duration: 1,
    opacity: 0.2,
  });
});

gsap.to('.logo', { rotation: 360, duration: 1, delay: 1.5 });

gsap.from('.fade-in', { duration: 2.5, opacity: 0.2 });

const slideLeftMassages = gsap.utils.toArray('.slide-left-massages');
slideLeftMassages.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -50,
    duration: 0.8,
    opacity: 0.5,
  });
});

const slideRightMassages = gsap.utils.toArray('.slide-right-massages');
slideRightMassages.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 50,
    duration: 0.8,
    opacity: 0.5,
  });
});
