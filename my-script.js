document.addEventListener('DOMContentLoaded', function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {
    // close all inner dropdowns when parent is closed
    document
      .querySelectorAll('.navbar .dropdown')
      .forEach(function (everydropdown) {
        everydropdown.addEventListener('hidden.bs.dropdown', function () {
          // after dropdown is hidden, then find all submenus
          this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
            // hide every submenu as well
            everysubmenu.style.display = 'none';
          });
        });
      });

    document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains('submenu')) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none';
          } else {
            nextEl.style.display = 'block';
          }
        }
      });
    });
  }
  // end if innerWidth
});
// DOMContentLoaded  end

$('table tr').click(function () {
  window.location = $(this).data('href');
});

// href when clicked on table row
if (document.location.hash) {
  setTimeout(function () {
    window.scrollTo(window.scrollX, window.scrollY - 75);
  }, 10);
}

// href when clicked on nav dropdown Usluge
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
    y: 50,
    duration: 1,
    opacity: 0.5,
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
