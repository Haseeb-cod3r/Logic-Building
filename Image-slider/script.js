const right = document.getElementById("right");
const left = document.getElementById("left");
const slider = document.querySelector(".slider");

const firstClone = slider.children[0].cloneNode(true);
slider.append(firstClone);
let sliderCounter = 0;
let intervalId = null;

function runIntervel() {
  return setInterval(() => {
    
      slider.style.transition = "all 0.8s ease-in-out";
      ++sliderCounter;
      slider.style.right = `${sliderCounter}00%`;
    

    if (sliderCounter === slider.children.length - 1) {
      setTimeout(() => {
        slider.style.transition = "none";
        sliderCounter = 0;
        slider.style.right = `${sliderCounter}00%`;
      }, 800);
    }
  }, 2000);
}
intervalId = runIntervel();

function interval() {
  return setTimeout(() => {
    intervalId = runIntervel();
  }, 1000);
}

let id = null;

right.addEventListener("click", (e) => {
  clearInterval(intervalId);
  clearTimeout(id);
  if (sliderCounter < slider.children.length - 1) {
    slider.style.transition = "none";

    ++sliderCounter;
  } else {
    sliderCounter = 1;
  }
  slider.style.right = `${sliderCounter}00%`;
  id = interval();
});
left.addEventListener("click", (e) => {
  clearInterval(intervalId);
  clearTimeout(id);
  if (sliderCounter > 0) {
    slider.style.transition = "none";
    --sliderCounter;
  } else {
    sliderCounter = slider.children.length - 2;
  }
  slider.style.right = `${sliderCounter}00%`;
  id = interval();
});

