const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h3');
const dateDetailH = document.querySelector('.chosen-date h3');
const continueBtn = document.getElementById('continue-btn');
const schedulesSelect = document.querySelectorAll('.sch-select');

const bookingData = {
  day: '',
  allTime: [],
  massageInfo: { masaza: '', vreme: '', cena: '' },
};

let calendarModal = new bootstrap.Modal(
  document.getElementById('calendar-modal'),
  { backdrop: 'static', keyboard: false }
);
let calendarErrorModal = new bootstrap.Modal(
  document.getElementById('calendar-error-modal'),
  { backdrop: 'static', keyboard: false }
);
let scheduleModal = new bootstrap.Modal(
  document.getElementById('schedule-modal'),
  { backdrop: 'static', keyboard: false }
);
let errorModal = new bootstrap.Modal(document.getElementById('error-modal'), {
  backdrop: 'static',
  keyboard: false,
});
let formModal = new bootstrap.Modal(document.getElementById('form-modal'), {
  backdrop: 'static',
  keyboard: false,
});

const onCalendarLoad = () => {
  calendarModal.show();
  renderCalendar();
};

const date = new Date();

const linkOfTheWebsiteUserCame = document.referrer;
console.log(linkOfTheWebsiteUserCame);

const renderCalendar = () => {
  const meseci = [];
  const dani = [];
  const month = date.getMonth();
  if (linkOfTheWebsiteUserCame.includes('-en')) {
    meseci.push(
      'January',
      'February',
      'March',
      'April',
      'May',
      'Jun',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    );

    dani.push(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    );
  } else {
    meseci.push(
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
      'Decembar'
    );
    dani.push(
      'Nedelja',
      'Ponedeljak',
      'Utorak',
      'Sreda',
      'Četvrtak',
      'Petak',
      'Subota'
    );
  }

  const mesec = meseci[month];

  currentMonth.innerHTML = `${mesec} ${date.getFullYear()}`;

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
    let clickedDate = new Date(date.getFullYear(), month, elem.innerHTML);
    const day = clickedDate.getDay();
    const clickedDan = dani[day];
    dateDetailH.innerHTML = `${clickedDan} ${clickedDate.getDate()} ${mesec} ${clickedDate.getFullYear()}`;
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

  const showCalendarError = () => {
    calendarModal.hide();
    calendarErrorModal.show();
  };

  //for "const date" - month and year are changing because of date manipulation during month change, but the date for date is not i.e. it is today's date
  const checkClickedDate = (elem) => {
    const currentDate = new Date();
    const clickedDate = new Date(date.getFullYear(), month, elem.innerHTML);

    if (clickedDate.getFullYear() === currentDate.getFullYear()) {
      if (clickedDate.getMonth() >= currentDate.getMonth()) {
        if (clickedDate.getDate() >= currentDate.getDate()) {
          calendarModal.hide();
          scheduleModal.show();
          bookingData.day = clickedDate.toDateString();
          resetScheduleValues();
        } else {
          showCalendarError();
        }
      } else {
        showCalendarError();
      }
    }
    if (clickedDate.getFullYear() < currentDate.getFullYear()) {
      showCalendarError();
    }
    if (clickedDate.getFullYear() > currentDate.getFullYear()) {
      calendarModal.hide();
      scheduleModal.show();
      resetScheduleValues();
    }
  };

  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      changeDateDetails(dateDiv);
      changePrevNextMonth(dateDiv);
      checkClickedDate(dateDiv);
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

const timeSchedule = [
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15',
  '21:30',
  '21:45',
  '22:00',
];

timeSchedule.forEach((time) => {
  let option = document.createElement('option');
  option.innerText = time;
  option.setAttribute('value', `${timeSchedule.indexOf(time)}`);
  document.querySelector('#time-select').appendChild(option);
});

const removeSchErrorClass = (elem) => {
  if (elem.value !== '' && elem.classList.contains('error-style')) {
    elem.classList.remove('error-style');
  }
};

const resetScheduleValues = () => {
  schedulesSelect.forEach((elem) => {
    elem.value = '';
    elem.classList.remove('error-style');
  });
};

schedulesSelect.forEach((elem) => {
  elem.addEventListener('click', () => {
    if (elem.classList.contains('error-style')) {
      removeSchErrorClass(elem);
    }
  });
});

continueBtn.addEventListener('click', () => {
  const selectTime = document.getElementById('time-select');
  const selectMass = document.getElementById('mass-select');
  schedulesSelect.forEach((elem) => {
    if (elem.value === '') {
      elem.classList.add('error-style');
      scheduleModal.hide();
      errorModal.show();
    }
  });
  if (selectTime.value !== '' && selectMass.value !== '') {
    bookingData.massageInfo.masaza = selectMass.selectedOptions[0].textContent;
    bookingData.massageInfo.cena = `${selectMass.selectedOptions[0].dataset.price} dinara`;
    setBookedTime(selectTime.value, selectMass.value);
    scheduleModal.hide();
    formModal.show();
  }
});

function setBookedTime(timeIndex, massageIndex) {
  const time = Number(timeIndex);
  const massage = Number(massageIndex);
  const add = time + massage;
  bookingData.massageInfo.vreme = `${timeSchedule[time]} - ${timeSchedule[add]}`;
  for (i = time; i < add; i++) {
    bookingData.allTime.push(timeSchedule[i]);
  }
}
