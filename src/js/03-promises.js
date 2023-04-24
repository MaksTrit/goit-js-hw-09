import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
// Отримав необхідні значення з форми
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  const firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPromises = Number(amount.value);
  
// Виправив зауваження
  if (firstDelay < 0 || stepDelay < 0 || amountPromises <= 0) {
    return Notify.warning(`Please enter correct data`);
  }

// Цикл викликаючий функцію створення промісів
  for (let i = 1; i <= amountPromises; i += 1) {
    // Змінна поточної затримки для кожного циклу
    const actualDelay = firstDelay + (i - 1) * stepDelay;

    createPromise(i, actualDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);        
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);       
      });
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
