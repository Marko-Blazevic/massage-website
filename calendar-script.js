const arrowPrevMonth = document.querySelector('.arrow-prev-month');
const arrowNextMonth = document.querySelector('.arrow-next-month');
const arrowPrevNextDay = document.querySelectorAll('.arrow-day');
const days = document.querySelector('.days');
const currentMonthH3 = document.querySelector('.month h3');
const chosenDateH3 = document.querySelector('.chosen-date h3');
const schContinueBtn = document.getElementById('sch-continue-btn');
const schBackBtn = document.getElementById('sch-back-btn');
const schedulesSelect = document.querySelectorAll('.sch-select');
const timeSelect = document.getElementById('time-select');
const massageSelect = document.getElementById('mass-select');
const pageURL = window.location.href;
const monthsList = [];
const daysList = [];
let date = new Date();
let dateToday;
let freeScheduleTime = [];
let timeIndexes = [];
let scheduleTimeData = [];
let displayedDate;
let clickedDateId;
let checkTime;
let massageDataValue;
let timeDataIndex;
let prevNextDay; //should this be deleted?

// async function fetchScheduleData() {
//   const response = await fetch('#');
//   if (!response.ok) {
//     throw new Error(`ERRRRROOOORRRR ${response.status}`);
//   }
//   const scheduleData = await response.json();
// }

//this data have to come from database
const scheduleValuesData = [
  {
    date: '2023115',
    time: [
      2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47,
    ],
  },
  {
    date: '2023117',
    time: [
      2, 3, 4, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    ],
  },
  {
    date: '2023119',
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
let timeErrorModal = new bootstrap.Modal(
  document.getElementById('time-error-modal'),
  {
    backdrop: 'static',
    keyboard: false,
  }
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
  date = new Date();
  dateToday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  calendarModal.show();
  renderCalendar(dateToday);
};

const renderCalendar = (date) => {
  let monthIndex = date.getMonth();
  if (pageURL.includes('-en')) {
    monthsList.push(
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
    daysList.push(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    );
  } else {
    monthsList.push(
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
    daysList.push(
      'Nedelja',
      'Ponedeljak',
      'Utorak',
      'Sreda',
      'Četvrtak',
      'Petak',
      'Subota'
    );
  }

  const displayedMonth = monthsList[monthIndex];
  currentMonthH3.innerHTML = `${displayedMonth} ${date.getFullYear()}`;
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
  const monthDates = days.childNodes;
  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      const dateValue = Number(dateDiv.textContent);
      changeDateDetailsHandler(date.getFullYear(), date.getMonth(), dateValue);
      checkClickedDate(date.getFullYear(), date.getMonth(), dateValue);
      timeCheck(clickedDateId);
    });
  });
};
const clickedDate = (year, month, date) => {
  let dateText;
  if (isNaN(date)) {
    // dateText = Number(date.textContent);
  } else {
    dateText = date;
  }
  return new Date(year, month, dateText);
  // return new Date(dateToday.getFullYear(), dateToday.getMonth(), dateText);
};
const clickedDateOk = () => {
  calendarModal.hide();
  scheduleModal.show();
  resetScheduleValues();
  setTimeValues();
};
const clickedDateNotOk = () => {
  calendarModal.hide();
  calendarErrorModal.show();
};
const checkClickedDate = (year, month, date) => {
  const clickedDateValue = clickedDate(year, month, date);

  if (clickedDateValue >= dateToday) {
    clickedDateOk();
  }
  if (clickedDateValue < dateToday) {
    clickedDateNotOk();
  }
};
const changeDateDetailsHandler = (year, month, date) => {
  const clickedDateValue = clickedDate(year, month, date);
  const day = clickedDateValue.getDay();
  const clickedDay = daysList[day];
  const displayedMonth = monthsList[clickedDateValue.getMonth()];
  date = new Date(
    clickedDateValue.getFullYear(),
    clickedDateValue.getMonth(),
    clickedDateValue.getDate()
  );
  chosenDateH3.innerHTML = `${clickedDay} ${clickedDateValue.getDate()} ${displayedMonth} ${clickedDateValue.getFullYear()}`;
  clickedDateId = `${clickedDateValue.getFullYear()}${clickedDateValue.getMonth()}${clickedDateValue.getDate()}`;
};

let arrowPrevNextDayListener = false;

const arrowPrevNextDayHandler = (elem, date) => {
  prevNextDay = null;
  const displayedFullDate = chosenDateH3.textContent.split(' ');

  displayedDate = Number(displayedFullDate[1]);
  if (elem.hasAttribute('data-prev')) {
    prevNextDay = displayedDate - 1;
  }
  if (elem.hasAttribute('data-next')) {
    prevNextDay = displayedDate + 1;
  }
  date.setDate(prevNextDay);

  clickedDateId = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  changeDateDetailsHandler(date.getFullYear(), date.getMonth(), date.getDate());
  resetScheduleValues();
  timeCheck(clickedDateId);
};
if (!arrowPrevNextDayListener) {
  arrowPrevNextDay.forEach((elem) => {
    elem.addEventListener('click', () => {
      resetScheduleData();
      arrowPrevNextDayHandler(elem, date);
    });
  });
  arrowPrevNextDayListener = true;
}
let schBackBtnListener = false;
if (!schBackBtnListener) {
  schBackBtn.addEventListener('click', onSchBackBtnClick);
  schBackBtnListener = true;
}

function onSchBackBtnClick() {
  arrowPrevNextDay.forEach((elem) => {
    elem.removeEventListener('click', () => {
      arrowPrevNextDayListener = false;
    });
  });

  resetScheduleData();
  onCalendarLoad();
}
arrowPrevMonth.addEventListener('click', () => {
  let prevMonth = date.getMonth() - 1;
  date.setMonth(prevMonth);
  renderCalendar(date);
});
arrowNextMonth.addEventListener('click', () => {
  // date = new Date();
  let nextMonth = date.getMonth() + 1;
  date.setMonth(nextMonth);
  renderCalendar(date);
});
function resetScheduleData() {
  scheduleTimeData = [];
  timeIndexes = [];
  freeScheduleTime = [];
  displayedDate = null;
  clickedDateId = '';
}

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
const timeCheck = (clickedDateId) => {
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
    scheduleModal.hide();
    timeErrorModal.show();
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
