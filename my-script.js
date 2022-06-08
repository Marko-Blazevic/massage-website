document.addEventListener('DOMContentLoaded', function () {
  el_autohide = document.querySelector('.autohide');

  // add padding-top to bady (if necessary)
  // navbar_height = document.querySelector('.navbar').offsetHeight;
  // document.body.style.paddingTop = navbar_height + 'px';

  if (el_autohide) {
    let last_scroll_top = 0;
    window.addEventListener('scroll', function () {
      let scroll_top = window.scrollY;
      if (scroll_top < last_scroll_top) {
        el_autohide.classList.remove('scrolled-down');
        el_autohide.classList.add('scrolled-up');
      } else {
        el_autohide.classList.remove('scrolled-up');
        el_autohide.classList.add('scrolled-down');
      }
      last_scroll_top = scroll_top;
    });
    // window.addEventListener
  }
  // if
});

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

gsap.to('.logo', {
  rotation: 360,
  duration: 1,
  delay: 1,
});

gsap.from('.fade-in', { duration: 2.5, opacity: 0.2 });

const currentPageStyle = gsap.to('.nav-link-style-about', {
  scrollTrigger: '#about',
  color: 'orange',
  duration: 0.1,
});
