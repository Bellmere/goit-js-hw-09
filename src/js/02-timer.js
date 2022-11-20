import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    width: '280px',
    position: 'right-top',
    distance: '10px',
    opacity: 1,
    backOverlay: true,
    warning: {
        background: '#FFA07A',
        textColor: '#fff',
        backOverlayColor: 'rgba(238,191,49,0.2)',
      },
    // ...
  });

const timerEl = document.querySelector('.timer');
const inputDateEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const eventDate = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

timerEl.style.cssText = `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    }
    else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDateEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputDateEl.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      eventDate.days.textContent = addLeadingZero(timeObject.days);
      eventDate.hours.textContent = addLeadingZero(timeObject.hours);
      eventDate.minutes.textContent = addLeadingZero(timeObject.minutes);
      eventDate.seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerEl.style.color = 'orange'; 
      }
    } else {
      Notiflix.Notify.success('Event finished');
      timerEl.style.color = 'red';
      clearInterval(timer);
    }
  }, 1000);
});