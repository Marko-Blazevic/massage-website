import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAEYSxupn0RyDuPgc_Y2bboAgGdOmD7ZvE',
  authDomain: 'calendar-schedule-time.firebaseapp.com',
  databaseURL: 'https://calendar-schedule-time-default-rtdb.firebaseio.com',
  projectId: 'calendar-schedule-time',
  storageBucket: 'calendar-schedule-time.appspot.com',
  messagingSenderId: '254505069588',
  appId: '1:254505069588:web:fa953266a14267c48e0b01',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(database);

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
const massageOption = document.querySelector('.massage-option');
const massageOptions = document.querySelectorAll('.massage-option');
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
let prevNextDay;
const occupiedTimeData = [];

// const scheduleValuesData = [
//   { date: '20231110', time: [0, 1] },
//   { date: '20231111', time: [5, 6, 7] },
//   { date: '20231111', time: [10, 11, 12, 13] },
//   { date: '20231111', time: [20, 21, 22, 23, 24] },
//   { date: '20231112', time: [30, 31, 32, 33, 34, 35] },
//   { date: '20231112', time: [40, 41, 42, 43] },
//   { date: '20231113', time: [45, 46, 47] },
//   { date: '20231113', time: [0, 1, 2] },
//   { date: '20231114', time: [10, 11, 12, 13, 14, 15] },
//   { date: '20231114', time: [20, 21, 22, 23, 24] },
//   { date: '20231114', time: [30, 31, 32, 33, 34, 35, 36] },
//   { date: '20231115', time: [40, 41, 42, 43, 44, 45] },
//   { date: '20231115', time: [5, 6, 7, 8] },
//   { date: '20231116', time: [15, 16, 17, 18, 19, 20] },
//   { date: '20231116', time: [25, 26, 27, 28, 29, 30] },
//   { date: '20231116', time: [35, 36, 37, 38, 39, 40, 41] },
//   { date: '20231117', time: [45, 46, 47] },
//   { date: '20231117', time: [0, 1, 2, 3, 4] },
//   { date: '20231117', time: [10, 11, 12, 13, 14, 15] },
//   { date: '20231118', time: [20, 21, 22, 23, 24] },
//   { date: '20231118', time: [30, 31, 32, 33, 34, 35, 36] },
//   { date: '20231119', time: [40, 41, 42, 43, 44, 45] },
//   { date: '20231119', time: [5, 6, 7, 8, 9, 10] },
//   { date: '20231120', time: [15, 16, 17, 18, 19, 20] },
//   { date: '20231120', time: [25, 26, 27, 28, 29, 30, 31] },
//   { date: '20231120', time: [35, 36, 37, 38, 39, 40, 41, 42] },
//   { date: '20231121', time: [45, 46, 47] },
//   { date: '20231121', time: [0, 1, 2, 3, 4] },
//   { date: '20231121', time: [10, 11, 12, 13, 14, 15, 16] },
//   { date: '20231122', time: [20, 21, 22, 23, 24] },
//   { date: '20231122', time: [30, 31, 32, 33, 34, 35, 36] },
//   { date: '20231123', time: [40, 41, 42, 43, 44, 45] },
//   { date: '20231123', time: [5, 6, 7, 8, 9, 10, 11] },
//   { date: '20231124', time: [15, 16, 17, 18, 19, 20] },
//   { date: '20231124', time: [25, 26, 27, 28, 29, 30, 31, 32] },
//   { date: '20231124', time: [35, 36, 37, 38, 39, 40, 41] },
//   {
//     date: '20231125',
//     time: [
//       2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
//       25, 26, 27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
//       46, 47,
//     ],
//   },
//   {
//     date: '20231127',
//     time: [
//       2, 3, 4, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
//       27, 28, 29, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
//     ],
//   },
//   {
//     date: '20231129',
//     time: [
//       1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 25, 26, 27, 28, 29, 30, 34, 35,
//       36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
//     ],
//   },
// ];

const fetchOcupiedTimeData = async () => {
  try {
    const response = await fetch(
      'https://calendar-schedule-time-default-rtdb.firebaseio.com/schedule.json'
    );
    if (!response.ok) {
      throw new Error('Can not get data!');
    }
    const data = await response.json();
    for (const obj in data) {
      const dataArray = data[obj];
      occupiedTimeData.push(dataArray);
    }
  } catch (error) {
    setError(error.message);
  }
  console.log(occupiedTimeData);
};
fetchOcupiedTimeData();

// const postDataToFirebase = async (obj) => {
//   try {
//     const response = await fetch(
//       `https://calendar-schedule-time-default-rtdb.firebaseio.com/schedule.json`,
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           userId: obj.date,
//           date: obj.date,
//           time: obj.time,
//         }),
//       }
// headers: {
//   "Content-Type": "application/json",
// },
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Successfully posted data:', data);
//   } catch (error) {
//     console.error('Error posting data:', error);
//   }
// };
// const postAllDataToFirebase = async () => {
//   for (const obj of scheduleValuesData) {
//     await postDataToFirebase(obj);
//   }
// };
// postAllDataToFirebase();

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

function onCalendarLoad() {
  date = new Date();
  dateToday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  calendarModal.show();
  renderCalendar(dateToday);
}

window.onload = onCalendarLoad();

function renderCalendar(date) {
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
  for (let j = prevMonthLastDayIndex; j > 0; j--) {
    days.innerHTML += `<div class="prev-date">${
      prevMonthLastDate - j + 1
    }</div>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    if (
      new Date().getDate() === i &&
      new Date().getMonth() === date.getMonth()
    ) {
      days.innerHTML += `<div class="today">${i}</div>`;
    } else {
      days.innerHTML += `<div>${i}</div>`;
    }
  }
  for (let x = 1; x < 9 - nextMonthFirstDayIndex; x++) {
    days.innerHTML += `<div class="next-date">${x}</div>`;
  }
  const monthDates = days.childNodes;
  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      const dateValue = Number(dateDiv.textContent);
      changeDateDetailsHandler(date.getFullYear(), date.getMonth(), dateValue);
      checkClickedDate(date.getFullYear(), date.getMonth(), dateValue);
      timeCheckHandler(clickedDateId);
    });
  });
}
const clickedDate = (year, month, date) => {
  let dateText;
  if (isNaN(date)) {
  } else {
    dateText = date;
  }
  return new Date(year, month, dateText);
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
  timeCheckHandler(clickedDateId);
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

//setting dropdown time values for schedule
const setTimeValues = () => {
  let timeSchedule = [];
  const minutes = ['00', '15', '30', '45'];
  let hour = 10;
  for (let y = 0; y < 12; y++) {
    const map = minutes.map((m) => `${hour}:${m}`);
    hour++;
    timeSchedule = timeSchedule.concat(map);
  }
  timeSchedule.forEach((time) => {
    let option = document.createElement('option');
    option.innerText = time;
    option.setAttribute('data-time-index', `${timeSchedule.indexOf(time)}`);
    option.className = 'time-option';
    timeSelect.appendChild(option);
  });
};
const timeCheckHandler = (clickedDateId) => {
  const timeOptions = document.querySelectorAll('.time-option');
  occupiedTimeData.forEach((data) => {
    if (clickedDateId === data.date) {
      scheduleTimeData.push(...data.time); //total already occupied time array for selected date
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

const getDataValuesHandler = () => {
  const checkTimeAndMassageArray = checkTimeAndMassageHandler();
  if (checkTimeAndMassageArray[0]) {
    const chosenTimeAndMassageData = { date: clickedDateId, time: [] };
    const timedataIndex = checkTimeAndMassageArray[1];
    const massageDataValue = checkTimeAndMassageArray[2];
    for (let i = 0; i < massageDataValue; i++) {
      chosenTimeAndMassageData.time.push(timedataIndex + i - 1);
    }
    console.log(chosenTimeAndMassageData);
  }
};

schContinueBtn.addEventListener('click', () => {
  checkTimeAndMassageHandler();
  getDataValuesHandler();
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
const checkTimeAndMassageHandler = () => {
  checkTime = true;
  const schMassIndex = massageSelect.selectedIndex;
  massageDataValue = Number(
    massageSelect.options[schMassIndex].dataset.massageValue
  );
  const schTimeIndex = timeSelect.selectedIndex;
  timeDataIndex =
    Number(timeSelect.options[schTimeIndex].dataset.timeIndex) + 1;
  for (
    let i = timeDataIndex;
    i < timeDataIndex + massageDataValue - 1 && i < 48;
    i++
  ) {
    let timeClass = timeSelect[i].classList.value;
    const noSpace = timeClass.replace(/ /g, '');
    if (noSpace.includes('hide')) {
      checkTime = false;
    }
  }
  return [checkTime, timeDataIndex, massageDataValue];
};
