gsap.registerPlugin(ScrollTrigger);

const tableTr = document.querySelectorAll(".table-row");

tableTr.forEach((e) =>
  e.addEventListener(`click`, function (e) {
    window.location = this.getAttribute("data-href");
  })
);

const slideUp = gsap.utils.toArray(".slide-up");
slideUp.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    y: 50,
    duration: 1,
    opacity: 0.2,
  });
});

const slideLeft = gsap.utils.toArray(".slide-left");
slideLeft.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: -50,
    duration: 1,
    opacity: 0.2,
  });
});

const slideRight = gsap.utils.toArray(".slide-right");
slideRight.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: elem,
    x: 50,
    duration: 1,
    opacity: 0.2,
  });
});

gsap.to(".logo", {
  rotation: 360,
  duration: 1,
  delay: 1,
});

gsap.to(".fade-in", { duration: 3, opacity: 1 });

// const currentPageStyle = gsap.to('.nav-link-style-about', {
//   scrollTrigger: '#about',
//   color: 'orange',
//   duration: 0.1,
// });

//PARALLAX

//For background scroll
// gsap.to('.index-wrapper', {
//   yPercent: -50,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '#about',
//     // markers: true,
//     // start: "top bottom", // the default values
//     // end: "bottom top",
//     scrub: true,
//   },
// });
// let tl = gsap.timeline();

// gsap.to(".logo-index-custom", {
//   scrollTrigger: {
//     trigger: ".logo-index-custom",
//     start: "center center",
//     pin: true,

//     end: "center 15%",
//     // markers: true,
//   },
//   // endTrigger: "#about",
// });

gsap.to(".index-text", {
  yPercent: -150,
  scrollTrigger: {
    trigger: ".index-text",
    scrub: 2,
  },
});

// gsap.to('#about', {
//   yPercent: 40,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '#about',
//     markers: true,

//     // start: "top bottom", // the default values
//     // end: 'center center',
//     scrub: true,
//   },
// });
