const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h3');
const dateDetail = document.querySelector('.chosen-date h3');
const schContinueBtn = document.getElementById('sch-continue-btn');
const schBackBtn = document.getElementById('sch-back-btn');
const schedulesSelect = document.querySelectorAll('.sch-select');
const timeSelect = document.getElementById('time-select');
const massageSelect = document.getElementById('mass-select');
let freeScheduleTime = [];
let timeIndexes = [];
let scheduleTimeData = [];
let clickedDateId;
let checkTime;
let massageDataValue;
let timeDataIndex;

// async function fetchScheduleData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   const scheduleData = await response.json();
//   return scheduleData;
// }

//this data have to come from database
const scheduleValuesData = [
  {
    date: '20231030',
    time: [
      2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47,
    ],
  },
  {
    date: '20231028',
    time: [
      2, 3, 4, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    ],
  },
  {
    date: '20231029',
    time: [
      1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 25, 26, 27, 28, 29, 30, 34, 35,
      36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    ],
  },
];

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

const pageURL = window.location.href;

const renderCalendar = () => {
  const meseci = [];
  const dani = [];
  const month = date.getMonth();

  if (pageURL.includes('-en')) {
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
  ).getDay(); //day of the week

  const nextMonthFirstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  ).getDay(); //day of the week

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
    dateDetail.innerHTML = `${clickedDan} ${clickedDate.getDate()} ${mesec} ${clickedDate.getFullYear()}`;
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
    clickedDateId = `${clickedDate.getFullYear()}${clickedDate.getMonth()}${clickedDate.getDate()}`;
    if (clickedDate.getFullYear() === currentDate.getFullYear()) {
      if (clickedDate.getMonth() >= currentDate.getMonth()) {
        if (clickedDate.getDate() >= currentDate.getDate()) {
          calendarModal.hide();
          scheduleModal.show();
          resetScheduleValues();
          setTimeValues();
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
      //here check if clicked date exists in data base and take time value for adding 'unclick' class - if free time array.length == 0, unclick day
      setTimeValues();
    }
  };
  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      changeDateDetails(dateDiv);
      changePrevNextMonth(dateDiv);
      checkClickedDate(dateDiv);
      timeCheck();
    });
  });
};

arrowPrev.addEventListener('click', () => {
  const prevMonth = date.getMonth() - 1;
  date.setMonth(prevMonth);
  renderCalendar();
  console.log(date);
  console.log(prevMonth);
});
arrowNext.addEventListener('click', () => {
  const nextMonth = date.getMonth() + 1;
  date.setMonth(nextMonth);
  renderCalendar();
  console.log(date);
  console.log(nextMonth);
});

//setting time values for schedule
const setTimeValues = () => {
  let timeSchedule = [];
  const minutes = ['00', '15', '30', '45'];
  let hour = 10;
  for (let y = 0; y < 12; y++) {
    const map = minutes.map((m) => `${hour}:${m}`);
    hour++;
    timeSchedule = timeSchedule.concat(map);
  }
  const timeSelect = document.querySelector('#time-select');
  timeSchedule.forEach((time) => {
    let option = document.createElement('option');
    option.innerText = time;
    option.setAttribute('data-time-index', `${timeSchedule.indexOf(time)}`);
    option.className = 'time-option';
    timeSelect.appendChild(option);
  });
};
const timeCheck = () => {
  const timeOptions = document.querySelectorAll('.time-option');
  scheduleValuesData.forEach((data) => {
    if (clickedDateId === data.date) {
      scheduleTimeData.push(...data.time);
    }
  });
  timeOptions.forEach((time) => {
    if (time.classList.contains('hide')) {
      time.classList.remove('hide');
      time.disabled = false;
    }
    let timeIndexAttribute = time.getAttribute('data-time-index');
    timeIndexes.push(Number(timeIndexAttribute));
    if (scheduleTimeData.includes(Number(timeIndexAttribute))) {
      time.classList.add('hide');
      time.disabled = true;
    }
  });
  freeScheduleTime = timeIndexes.filter(
    (elem) => !scheduleTimeData.includes(Number(elem))
  );
  checkMassageOptionValidity(freeScheduleTime);
};
const removeErrorClass = (elem) => {
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
      removeErrorClass(elem);
    }
  });
});
const massageOptions = document.querySelectorAll('.massage-option');
const checkMassageOptionValidity = (freeScheduleTime) => {
  massageOptions.forEach((opt) => {
    if (opt.classList.contains('hide')) {
      opt.classList.remove('hide');
      opt.disabled = false;
    }
    let massageValue = opt.getAttribute('data-massage-value');
    const result = isContinuous(freeScheduleTime, massageValue);
    if (!result) {
      opt.classList.add('hide');
      opt.disabled = true;
    }
  });
};
const isContinuous = (freeScheduleTime, massageValue) => {
  for (let i = 0; i < freeScheduleTime.length; i++) {
    let isSequence = true;
    for (let j = 1; j < massageValue - 1; j++) {
      if (freeScheduleTime[i + j] !== freeScheduleTime[i] + j) {
        isSequence = false;
        break;
      }
    }
    if (isSequence) {
      return true;
    }
  }
  return false;
};
schBackBtn.addEventListener('click', () => {
  scheduleTimeData = [];
  timeIndexes = [];
  freeScheduleTime = [];
});
schContinueBtn.addEventListener('click', () => {
  checkTimeAndMassage();
  let allSelectsHaveValue = true;
  schedulesSelect.forEach((elem) => {
    if (elem.value === '') {
      elem.classList.add('error-style');
      scheduleModal.hide();
      errorModal.show();
      allSelectsHaveValue = false;
    } else {
      allSelectsHaveValue = true;
      removeErrorClass(elem);
    }
  });
  if (allSelectsHaveValue && checkTime) {
    scheduleModal.hide();
    formModal.show();
  }
  if (!checkTime) {
    alert('Time and Massage not suitable'); //make new modal for this !!!!!!!!!!!!!!!
  }
});
const checkTimeAndMassage = () => {
  checkTime = true;
  const schMassIndex = massageSelect.selectedIndex;
  massageDataValue = Number(
    massageSelect.options[schMassIndex].dataset.massageValue
  );
  const schTimeIndex = timeSelect.selectedIndex;
  timeDataIndex =
    Number(timeSelect.options[schTimeIndex].dataset.timeIndex) + 1;
  for (
    i = timeDataIndex;
    i < timeDataIndex + massageDataValue - 1 && i < 48;
    i++
  ) {
    let timeClass = timeSelect[i].classList.value;
    const noSpace = timeClass.replace(/ /g, '');
    if (noSpace.includes('hide')) {
      checkTime = false;
    }
  }
};
