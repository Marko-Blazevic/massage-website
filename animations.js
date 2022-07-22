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
    duration: 1.5,
    opacity: 0,
  });
});

const slideDown = gsap.utils.toArray('.slide-down');
slideDown.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: -50,
    duration: 1.5,
    opacity: 0,
  });
});

const slideLeft = gsap.utils.toArray('.slide-left');
slideLeft.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -50,
    duration: 1.5,
    opacity: 0,
  });
});

const slideRight = gsap.utils.toArray('.slide-right');
slideRight.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 50,
    duration: 1.5,
    opacity: 0,
  });
});

gsap.set('.fade-in', {
  opacity: 0,
});

let tl = gsap.timeline();

const fadeIn = document.querySelectorAll('.fade-in');
fadeIn.forEach((elem) => {
  tl.to(
    elem,
    {
      duration: 2,
      opacity: 1,
      ease: 'power1.inOut',
    },
    '<.2'
  );
});
tl.to(
  '.logo',
  {
    rotation: 360,
    duration: 1,
  },
  '-=1'
);

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

const slideUpText = gsap.utils.toArray('.slide-up-text');
slideUpText.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: 50,
    duration: 1,
    opacity: 0,
    delay: 0.2,
  });
});

gsap.from('.pop-up', {
  scrollTrigger: '.pop-up',
  scale: 0,
  duration: 3,
  delay: 0.2,
  ease: Elastic.easeOut.config(1, 0.5),
});
