const navbarToggler = document.querySelector('.navbar-toggler');
const overlay = document.querySelector('.overlay');

navbarToggler.addEventListener('click', () => {
  if (overlay.style.display === 'none') {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

gsap.registerPlugin(ScrollTrigger);

const tableTr = document.querySelectorAll('.table-row');

tableTr.forEach((e) =>
  e.addEventListener(`click`, function (e) {
    window.location = this.getAttribute('data-href');
  })
);

const slideUp = gsap.utils.toArray('.slide-up');
slideUp.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: 50,
    duration: 1,
    opacity: 0,
  });
});

const slideLeft = gsap.utils.toArray('.slide-left');
slideLeft.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -50,
    duration: 1,
    opacity: 0,
  });
});

const slideRight = gsap.utils.toArray('.slide-right');
slideRight.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 50,
    duration: 1,
    opacity: 0,
  });
});

gsap.to('.logo', {
  rotation: 360,
  duration: 1,
  delay: 1,
});

gsap.to('.fade-in', { duration: 2, opacity: 1, ease: 'power1.inOut' });

gsap.set('.index-img-wrapper', {
  yPercent: 40,
});
gsap.to('.index-img-wrapper', {
  yPercent: -20,
  scrollTrigger: {
    trigger: '.index-content',
    scrub: true,
  },
});
gsap.to('.index-text', {
  yPercent: -250,
  scrollTrigger: {
    trigger: '.index-content',
    scrub: true,
  },
});
