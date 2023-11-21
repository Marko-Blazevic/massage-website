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

  //for "const date" - month and year are changing because of date manipulation during month change, but the date for date is not i.e. it is today's date
  const checkClickedDate = (elem) => {
    const currentDate = new Date();
    const clickedDate = new Date(date.getFullYear(), month, elem.innerHTML);

    const id = `${clickedDate.getFullYear()}${clickedDate.getMonth()}${clickedDate.getDate()}`;

    if (clickedDate.getFullYear() === currentDate.getFullYear()) {
      if (clickedDate.getMonth() >= currentDate.getMonth()) {
        if (clickedDate.getDate() >= currentDate.getDate()) {
          calendarModal.hide();
          scheduleModal.show();
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

let timeSchedule = [];
//setting time values for schedule
const minutes = ['00', '15', '30', '45'];
let hour = 10;
for (y = 0; y < 12; y++) {
  const map = minutes.map((m) => `${hour}:${m}`);
  hour++;
  timeSchedule = timeSchedule.concat(map);
}
//setting an id for every time point in timeSchedule
// const timeScheduleObjects = [];
// for (i = 0; i < 48; i++) {
//   let timeObject = { time: timeSchedule[i], id: i };
//   timeScheduleObjects.push(timeObject);
// }
// console.log(timeScheduleObjects );

// const scheduledData = fetchScheduleData();
// // scheduledData = [{id: id1, time: []}, {id: id2, time: []}]
// for (const obj of scheduledData){
// for (const key in obj){
// if(timeScheduleObjects.includes(key.id){}
// }
// }

//!!!!!!!!!!!!!!!!!!!!!!!!!! ovo ili ne treba da postoji ili treba da se izmeni ideja od value ili id za timeschedule
timeSchedule.forEach((time) => {
  const timeSelect = document.querySelector('#time-select');
  let option = document.createElement('option');
  option.innerText = time;
  option.setAttribute('data-index', `${timeSchedule.indexOf(time)}`);
  option.className = 'time-option';
  timeSelect.appendChild(option);
});

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

timeOptions.forEach((elem) =>
  elem.addEventListener('click', () => {
    const value = elem.getAttribute('data-index');
    console.log(value);
  })
);

continueBtn.addEventListener('click', () => {
  schedulesSelect.forEach((elem) => {
    if (elem.value === '') {
      elem.classList.add('error-style');
      scheduleModal.hide();
      errorModal.show();
    }
  });
  if (selectTime.value !== '' && selectMass.value !== '') {
    // bookingData.massageInfo.masaza = selectMass.selectedOptions[0].textContent;
    // bookingData.massageInfo.cena = `${selectMass.selectedOptions[0].dataset.price} dinara`;
    // setBookedTime(selectTime.value, selectMass.value);
    scheduleModal.hide();
    formModal.show();
  }
});

// function setBookedTime(timeIndex, massageIndex) {
//   const time = Number(timeIndex);
//   const massage = Number(massageIndex);
//   const add = time + massage;
//   bookingData.massageInfo.vreme = `${timeSchedule[time]} - ${timeSchedule[add]}`;
//   for (i = time; i < add; i++) {
//     bookingData.allTime.push(timeSchedule[i]);
//   }
// }

// const timeScheduleObject = {
//   id: id,
//   time: time
// }
