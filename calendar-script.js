const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.month h3');
const dateDetailH = document.querySelector('.chosen-date h3');
const continueBtn = document.getElementById('continue-btn');
const schedulesSelect = document.querySelectorAll('.sch-select');
const timeSelect = document.querySelectorAll('#time-select');
const massSelect = document.querySelectorAll('#mass-select');

async function fetchScheduleData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const scheduleData = await response.json();
  return scheduleData;
}

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

  //this data have to come from database
  const scheduleValuesData = {
    date: '20231025',
    time: [],
  };

  for (let i = 3; i < 46; i++) {
    scheduleValuesData.time.push(i);
  }
  console.log('Ovo je database array  ' + scheduleValuesData.time);

  // let dataTimeArray;
  // const checkDateAndTime = (dateId) => {
  //   for (const dataObject of scheduleValuesData) {
  //     if (dateId === dataObject.date) {
  //       dataTimeArray = dataObject.time;
  //       //   for (let i = 0; i < timeArray.length; i++) {
  //       //     if (timeIndexArray.includes(dataTimeArray[i])) {
  //       //     }
  //       //   }
  //       // } else {
  //       //   console.log('Nema nista za ovaj datum.');
  //       // }
  //     }
  //   }
  // };
  // console.log(dataTimeArray);

  //for "const date" - month and year are changing because of date manipulation during month change, but the date for date is not i.e. it is today's date
  const checkClickedDate = (elem) => {
    const currentDate = new Date();
    const clickedDate = new Date(date.getFullYear(), month, elem.innerHTML);

    const dateId = `${clickedDate.getFullYear()}${clickedDate.getMonth()}${clickedDate.getDate()}`;

    if (clickedDate.getFullYear() === currentDate.getFullYear()) {
      if (clickedDate.getMonth() >= currentDate.getMonth()) {
        if (clickedDate.getDate() >= currentDate.getDate()) {
          calendarModal.hide();
          scheduleModal.show();
          resetScheduleValues();

          //here check if clicked date exists in data base and take time value for adding 'unclick' class
          setTimeValues();
          // checkDateAndTime(dateId);
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
      //here check if clicked date exists in data base and take time value for adding 'unclick' class

      setTimeValues();

      // checkDateAndTime(dateId);
    }
  };

  monthDates.forEach((dateDiv) => {
    dateDiv.addEventListener('click', () => {
      changeDateDetails(dateDiv);
      changePrevNextMonth(dateDiv);
      checkClickedDate(dateDiv);
    });
  });

  arrowPrev.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
  arrowNext.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
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
    timeCheck();
  };

  const timeCheck = () => {
    const timeOptions = document.querySelectorAll('.time-option');
    const scheduleTimeData = scheduleValuesData.time;
    const timeIndexes = [];
    timeOptions.forEach((time) => {
      let timeIndexAttribute = time.getAttribute('data-time-index');
      timeIndexes.push(timeIndexAttribute);
      if (scheduleTimeData.includes(Number(timeIndexAttribute))) {
        time.className = 'hide';
      }
    });
    const freeScheduleTime = timeIndexes.filter(
      (elem) => !scheduleTimeData.includes(Number(elem))
    );
    console.log(freeScheduleTime);
    console.log('Ovo su sva vremena ' + timeIndexes);
    checkMassageOptionValidity(freeScheduleTime);
  };

  const removeSchErrorClass = (elem) => {
    if (elem.value !== '' && elem.classList.contains('error-style')) {
      elem.classList.remove('error-style');
    }
  };

  //removes selected sch-select values for every new date select
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

  const timeOptions = document.querySelectorAll('.time-option');
  let timeIndex;

  timeOptions.forEach((elem) =>
    elem.addEventListener('click', () => {
      timeIndex = elem.getAttribute('data-time-index');
    })
  );

  const massageOptions = document.querySelectorAll('.massage-option');

  // let massageValue;
  // massageOptions.forEach((elem) =>
  //   elem.addEventListener('click', () => {
  //     massageValue = elem.getAttribute('data-massage-value');
  //     console.log(massageValue);
  //   })
  // );
  const checkMassageOptionValidity = (freeScheduleTime) => {
    massageOptions.forEach((opt) => {
      let massageValue = opt.getAttribute('data-massage-value');
      let massageTime = opt.getAttribute('data-massage-time');
      let count = 1;
      for (let i = 0; i < freeScheduleTime.length; i++) {
        if (freeScheduleTime[i] == freeScheduleTime[i] - 1) {
          count++;
          console.log('Ovo je i  ' + i);
        }
        if (count < Number(massageValue)) {
          opt.className = 'hide';
        }
      }
    });
  };

  continueBtn.addEventListener('click', () => {
    schedulesSelect.forEach((elem) => {
      if (elem.value === '') {
        elem.classList.add('error-style');
        scheduleModal.hide();
        errorModal.show();
      } else {
        scheduleModal.hide();
        formModal.show();
      }
    });
  });
};
