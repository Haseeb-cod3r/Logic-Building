// ============ digital clock code start from here =================

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");

setInterval(() => {
  const date = new Date();

  let hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  ampm.innerText = hour > 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  hours.innerText = hour;
  minutes.innerText = minute;
  seconds.innerText = second;
}, 1000);



// ============= stop watch code start from here ===========
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const milliSec = document.getElementById("milliSec");
const watchContainer = document.querySelector(".watch-container");

let milliSecCounter = 0;
let secCounter = 0;
let minCounter = 0;
let intervalId = null;

function startCounter() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    milliSecCounter += 10;
    if (milliSecCounter >= 1000) {
      secCounter += 1;
      milliSecCounter = 0;
    }
    if (secCounter === 60) {
      minCounter += 1;
      secCounter = 0;
    }
    if (minCounter === 60) {
      resetCounter(true);
    }

    min.innerText = String(minCounter).padStart(2, "0");
    sec.innerText = String(secCounter).padStart(2, "0");
    milliSec.innerText = String(milliSecCounter).padStart(3, "0");
  }, 10);
}

function stopCounter() {
  clearInterval(intervalId);
  intervalId = null
}
function resetCounter(isRunAgain) {
  clearInterval(intervalId);
  intervalId = null;
  milliSecCounter = 0;
  secCounter = 0;
  minCounter = 0;
  milliSec.innerText = "000";
  sec.innerText = "00";
  min.innerText = "00";
  if (isRunAgain) startCounter();
}

watchContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Start") startCounter();
  if (e.target.innerText === "Stop") stopCounter();
  if (e.target.innerText === "Reset") resetCounter();
});
