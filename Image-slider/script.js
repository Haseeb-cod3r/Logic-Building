const right = document.getElementById("right");
const left = document.getElementById("left");
const slider = document.querySelector(".slider");
const clone = slider.children[0].cloneNode(true);
slider.append(clone);

let sliderCounter = 0;
let intervalId = null;

function runSlider() {
  return setInterval(() => {
    if (sliderCounter < slider.children.length - 1) {
      slider.style.transition = "all 0.8s ease-in-out";
      sliderCounter += 1;
      slider.style.right = `${sliderCounter}00%`;
    }
    if (sliderCounter === slider.children.length - 1) {
      setTimeout(() => {
        slider.style.transition = "none";
        sliderCounter = 0;
        slider.style.right = "0%";
      }, 800);
    }
  }, 2000);
}
intervalId = runSlider();
right.addEventListener("click", () => {
  clearInterval(intervalId);

  if (sliderCounter < slider.children.length - 1) {
    slider.style.transition = "none";
    sliderCounter += 1;
    slider.style.right = `${sliderCounter}00%`;
  }
  if (sliderCounter === slider.children.length - 1) {
    sliderCounter = 0;
    slider.style.right = "0%";
  }
  intervalId = runSlider();
});
left.addEventListener("click", () => {
  clearInterval(intervalId);
  if (sliderCounter > 0) {
    slider.style.transition = "none";
    sliderCounter -= 1;
    slider.style.right = `${sliderCounter}00%`;
  } else if (sliderCounter === 0) {
    sliderCounter = slider.children.length - 2;
    slider.style.right = `${sliderCounter}00%`;
  }
  intervalId = runSlider();
});
