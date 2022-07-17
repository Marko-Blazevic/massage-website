const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h2');
const dateDetailH = document.querySelector('.chosen-date h3');

const date = new Date();

const renderCalendar = () => {
  const day = date.getDay();
  const month = date.getMonth();

  const meseci = [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar',
  ];
  const dani = [
    'Nedelja',
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota',
  ];

  const mesec = meseci[month];
  const dan = dani[day];

  currentMonth.innerHTML = `${mesec} ${date.getFullYear()}`;
  dateDetailH.innerHTML = `${dan} ${date.getDate()} ${mesec} ${date.getFullYear()}`;

  const lastDateOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevMonthLastDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const prevMonthLastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDay();
  const nextMonthFirstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  ).getDay();

  days.innerHTML = '';

  for (j = prevMonthLastDayIndex; j > 0; j--) {
    days.innerHTML += `<div class="prev-date">${
      prevMonthLastDate - j + 1
    }</div>`;
  }
  for (i = 1; i <= lastDateOfMonth; i++) {
    if (
      new Date().getDate() === i &&
      new Date().getMonth() === date.getMonth()
    ) {
      days.innerHTML += `<div class="today">${i}</div>`;
    } else {
      days.innerHTML += `<div>${i}</div>`;
    }
  }
  for (x = 1; x < 9 - nextMonthFirstDayIndex; x++) {
    days.innerHTML += `<div class="next-date">${x}</div>`;
  }

  //change date-details on calendar date click
  const monthDates = days.querySelectorAll('div');

  const changeDateDetails = (elem) => {
    let clickedDate = '';
    elem.addEventListener('click', () => {
      clickedDate = new Date(date.getFullYear(), month, elem.innerHTML);
      const day = clickedDate.getDay();
      const clickedDan = dani[day];
      dateDetailH.innerHTML = `${clickedDan} ${clickedDate.getDate()} ${mesec} ${clickedDate.getFullYear()}`;
    });
  };

  const changePrevNextMonth = (elem) => {
    elem.addEventListener('click', () => {
      if (elem.classList.contains('next-date')) {
        date.setMonth(month + 1);
        renderCalendar();
      }
      if (elem.classList.contains('prev-date')) {
        date.setMonth(month - 1);
        renderCalendar();
      }
    });
  };

  const removeBlur = (elem) => {
    elem.addEventListener('click', () => {
      const dateDetailsWrapper = document.querySelector('.schedule-wrapper');
      const overlaySch = document.querySelector('.overlay-schedule');
      dateDetailsWrapper.style.filter = ' blur(0)';
      overlaySch.style.display = 'none';
    });
  };

  monthDates.forEach((clickedOn) => {
    changeDateDetails(clickedOn);
    changePrevNextMonth(clickedOn);
    removeBlur(clickedOn);
  });
};

arrowPrev.addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
arrowNext.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
