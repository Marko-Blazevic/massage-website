const date = new Date();

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
  'Ponedeljak',
  'Utorak',
  'Sreda',
  'Četvrtak',
  'Petak',
  'Subota',
  'Nedelja',
];

const mesec = meseci[month];
const dan = dani[day];
currentMonth.innerHTML = mesec;

currentDate.innerHTML = `${dan} ${date.getDate()} ${mesec} ${date.getFullYear()}`;

for (i = 1; i <= 31; i++) {
  days.innerHTML += `<div>${i}</div>`;
}
