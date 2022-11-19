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

const inputDateEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let timerId = null;
let eventDateTimer = Number(eventDateTimer);
console.log(typeof(eventDateTimer));

const eventDate = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

startBtn.addEventListener('click', onTimerId);

function onTimerId(e) {
  timerId = setInterval(() => {
    Number(eventDateTimer) - 1000;
    console.log(this.timerId);
  },1000);
}

const date = new Date();
console.log(date);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < date) {
        Notiflix.Notify.warning('Please choose a date in the future');
      }
      else {
        startBtn.disabled = false;
        eventDateTimer =  selectedDates[0] - date;
        console.log(eventDateTimer);
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