const arrowPrevMonth = document.querySelector('.arrow-prev-month');
const arrowNextMonth = document.querySelector('.arrow-next-month');
const arrowPrevDay = document.querySelector('.arrow-prev-day');
const arrowNextDay = document.querySelector('.arrow-next-day');
const days = document.querySelector('.days');
const currentMonthH3 = document.querySelector('.month h3');
const chosenDate = document.querySelector('.chosen-date h3');
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

let date;
const onCalendarLoad = () => {
  date = new Date();
  calendarModal.show();
  renderCalendar(date);
};

const pageURL = window.location.href;

const renderCalendar = (date) => {
  const monthsList = [];
  const daysList = [];
  const monthIndex = date.getMonth();

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
  const monthDates = days.childNodes;
  const clickedDate = (elem) => {
    console.log(elem);
    return new Date(date.getFullYear(), monthIndex, elem);
  };
  const changeDateDetails = (elem) => {
    console.log(elem);
    const clickedDateValue = clickedDate(elem);
    console.log(clickedDateValue);
    const day = clickedDateValue.getDay();
    const clickedDay = daysList[day];

    chosenDate.innerHTML = `${clickedDay} ${clickedDateValue.getDate()} ${displayedMonth} ${clickedDateValue.getFullYear()}`;

    clickedDateId = `${clickedDateValue.getFullYear()}${clickedDateValue.getMonth()}${clickedDateValue.getDate()}`;
  };
  const checkClickedDate = (elem) => {
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
    const currentDate = new Date();
    const clickedDateValue = clickedDate(elem);
    if (clickedDateValue.getFullYear() === currentDate.getFullYear()) {
      if (clickedDateValue.getMonth() === currentDate.getMonth()) {
        if (clickedDateValue.getDate() >= currentDate.getDate()) {
          clickedDateOk();
        } else {
          clickedDateNotOk();
        }
      } else if (clickedDateValue.getMonth() > currentDate.getMonth()) {
        clickedDateOk();
      } else {
        clickedDateNotOk();
      }
    } else if (clickedDateValue.getFullYear() > currentDate.getFullYear()) {
      clickedDateOk();
    } else {
      clickedDateNotOk();
    }
    //here check if clicked date exists in data base and take time value for adding 'unclick' class - if free time array.length == 0, unclick day
  };
  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      const dateValue = dateDiv.textContent;
      changeDateDetails(dateValue);
      checkClickedDate(dateDiv);
      timeCheck();
    });
  });
};

arrowPrevMonth.addEventListener('click', () => {
  let prevMonth = date.getMonth() - 1;
  if (prevMonth === -1) {
    prevMonth = 11;
  }
  date.setMonth(prevMonth);
  console.log(prevMonth, date.getMonth());
  renderCalendar(date);
});
arrowNextMonth.addEventListener('click', () => {
  let nextMonth = date.getMonth() + 1;
  if (nextMonth === 12) {
    nextMonth = 0;
  }
  date.setMonth(nextMonth);
  console.log(nextMonth, date.getMonth());
  renderCalendar(date);
});

arrowPrevDay.addEventListener('click', () => {
  const displayedFullDate = chosenDate.textContent.split(' ');
  const displayedDate = displayedFullDate[1];
  const prevDay = displayedDate - 1;
  if (prevDay === 0) {
    prevDay = -1;
  }
  changeDateDetails(prevDay);
  // date.setDate(prevDay);
  // renderCalendar(date);
  // console.log(prevDay);
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
    console.log(clickedDateId, data.date);
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
