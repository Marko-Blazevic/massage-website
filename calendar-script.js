const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h3');
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

  monthDates.forEach((clickedOn) => {
    changeDateDetails(clickedOn);
    changePrevNextMonth(clickedOn);
    clickedOn.addEventListener('click', () => {
      calendarModal.hide();
      scheduleModal.show();
      resetScheduleValues();
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

const selectHour = document.getElementById('hour-select');
const selectMin = document.getElementById('min-select');
const selectMass = document.getElementById('mass-select');
const continueBtn = document.getElementById('continue-btn');
const backBtn = document.getElementById('back-btn');

let calendarModal = new bootstrap.Modal(
  document.getElementById('calendar-modal'),
  {
    keyboard: false,
  }
);
let scheduleModal = new bootstrap.Modal(
  document.getElementById('schedule-modal'),
  {
    keyboard: false,
  }
);
let errorModal = new bootstrap.Modal(document.getElementById('error-modal'), {
  keyboard: false,
});
let formModal = new bootstrap.Modal(document.getElementById('form-modal'), {
  keyboard: false,
});

const onCalendarLoad = () => {
  calendarModal.show();
};

const schedulesSelect = document.querySelectorAll('.sch-select ');

const removeSchErrorClass = (elem) => {
  if (elem.value !== '' && elem.classList.contains('error-style')) {
    elem.classList.remove('error-style');
  }
};

schedulesSelect.forEach((elem) => {
  elem.addEventListener('click', () => {
    removeSchErrorClass(elem);
  });
});

const resetScheduleValues = () => {
  selectHour.value = '';
  selectMin.value = '';
  selectMass.value = '';
  selectHour.classList.remove('error-style');
  selectMin.classList.remove('error-style');
  selectMass.classList.remove('error-style');
};

continueBtn.addEventListener('click', () => {
  schedulesSelect.forEach((elem) => {
    if (elem.value !== '') {
      scheduleModal.hide();
      formModal.show();
      resetScheduleValues();
    }
    if (elem.value === '') {
      elem.classList.add('error-style');
      scheduleModal.hide();
      errorModal.show();
    }
  });
});
