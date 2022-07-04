const date = new Date();
date.setMonth(7);
const days = document.querySelector('.days');
const currentMonth = document.querySelector('.date h1');
const currentDate = document.querySelector('.date p');
const month = date.getMonth();
const day = date.getDay();

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
currentMonth.innerHTML = mesec.toUpperCase();
currentDate.innerHTML = `${dan} ${date.getDate()} ${mesec} ${date.getFullYear()}`;

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
const firstDateNextMonth = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  1
).getDate();
const nextMonthFirstDayIndex = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  1
).getDay();

console.log(prevMonthLastDate);
console.log(prevMonthLastDayIndex);
console.log(lastDateOfMonth);
console.log(nextMonthFirstDayIndex);
console.log(date);

for (j = prevMonthLastDayIndex; j > 0; j--) {
  days.innerHTML += `<div class="prev-date">${prevMonthLastDate - j + 1}</div>`;
}
for (i = 1; i <= lastDateOfMonth; i++) {
  days.innerHTML += `<div>${i}</div>`;
}
for (x = 1; x < 9 - nextMonthFirstDayIndex; x++) {
  days.innerHTML += `<div class="next-date">${x}</div>`;
}
