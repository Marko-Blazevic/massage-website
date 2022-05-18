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

gsap.from('.slide-up-wo-trigger', { duration: 1.5, opacity: 0.2, y: 30 });

gsap.to('.fade-in', { duration: 2, opacity: 1 });
