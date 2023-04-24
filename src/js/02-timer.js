import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from "notiflix";

const bodyEl = document.querySelector("body");
const startBtn = document.querySelector("[data-start]");

startBtn.setAttribute("disabled", "true");

bodyEl.addEventListener("click", timerFoo);

let timerID = null;
let finalDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (Date.now() < selectedDates[0]) {
          finalDate = selectedDates[0];
          startBtn.removeAttribute("disabled");          
          return;
      };
      return Notify.failure('Please choose a date in the future');
  },
};

flatpickr("#datetime-picker", options);

function timerFoo(e) {

    if (e.target !== startBtn) {        
        return;
    };

    const days = document.querySelector('[data-days]');
    const hours = document.querySelector('[data-hours]');
    const minutes = document.querySelector('[data-minutes]');
    const seconds = document.querySelector('[data-seconds]');

// Виправлені зауваження
    const inputEl = document.querySelector("#datetime-picker");
    inputEl.setAttribute("disabled", "true");    
    startBtn.setAttribute("disabled", "true");

    timerID = setInterval(() => {
        if ((finalDate - Date.now()) < 1000) {
            inputEl.removeAttribute("disabled");            
            clearInterval(timerID);
        };
        
        const convertedTime = convertMs(finalDate - Date.now());
        days.textContent = addLeadingZero(convertedTime.days);
        hours.textContent = addLeadingZero(convertedTime.hours);
        minutes.textContent = addLeadingZero(convertedTime.minutes);
        seconds.textContent = addLeadingZero(convertedTime.seconds);        
    }, 1000);  
};

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour); 
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    const timerValue = `${value}`;
    return timerValue.padStart(2, "0");
};
