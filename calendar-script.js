const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h2');
const dateDetails = document.querySelector('.chosen-date h3');

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
  dateDetails.innerHTML = `${dan} ${date.getDate()} ${mesec} ${date.getFullYear()}`;

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

  const monthDates = days.querySelectorAll('div');

  monthDates.forEach((clickedOn) => {
    let clickedDate = '';
    clickedOn.addEventListener('click', () => {
      clickedDate = new Date(date.getFullYear(), month, clickedOn.innerHTML);
      const day = clickedDate.getDay();
      const clickedDan = dani[day];
      dateDetails.innerHTML = `${clickedDan} ${clickedDate.getDate()} ${mesec} ${clickedDate.getFullYear()}`;
    });
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

const scheduleHours = document.querySelector('.hours-dropdown');
const scheduleMinutes = document.querySelector('.minutes-dropdown');
const scheduleMassage = document.querySelector('.mass-type-dropdown');

const schHoursBtn = scheduleHours.querySelector('button');
const schMinutesBtn = scheduleMinutes.querySelector('button');
const schMassageBtn = scheduleMassage.querySelector('button');

const schHoursLink = scheduleHours.querySelectorAll('li');
const schMinutesLink = scheduleMinutes.querySelectorAll('li');
const schMassageLink = scheduleMassage.querySelectorAll('li');

let schHours = '';
let schMinutes = '';
let schMassage = '';

schHoursLink.forEach((link) => {
  link.addEventListener('click', () => {
    schHours = link.innerHTML;
    schHoursBtn.innerHTML = schHours;
  });
});
schMinutesLink.forEach((link) => {
  link.addEventListener('click', () => {
    schMinutes = link.innerHTML;
    schMinutesBtn.innerHTML = schMinutes;
  });
});
schMassageLink.forEach((link) => {
  link.addEventListener('click', () => {
    schMassage = link.innerHTML;
    schMassageBtn.innerHTML = schMassage;
  });
});
