const circle = document.querySelector(".circle");
const slider = document.querySelector(".slider");
const toggle = document.getElementById("radio");
const btn = document.getElementById("btn");
const price = document.getElementById("price");
const views = document.getElementById("views");

const plans = [
  { views: "10K", price: 8 },
  { views: "50K", price: 12 },
  { views: "100K", price: 16 },
  { views: "500K", price: 24 },
  { views: "1M", price: 36 },
];
function showPrice(index = 0) {
  views.innerText = plans[index].views;
  price.innerText = `$${plans[index].price.toFixed(2)}`;
}
showPrice();

let isDragging = false;

circle.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
  document.addEventListener("mousemove", slid);
});
document.addEventListener("mouseup", (e) => {
  isDragging = false;
  document.removeEventListener("mousemove", slid);
});

function slid(e) {
  const rect = slider.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;

  const percentWithFloat = Math.max(
    0,
    (Math.min(offsetX, width) / width) * 100
  );
  const percent = Math.floor(percentWithFloat);
  if (percent === 0) {
    circle.style.left = `${percent}%`;
  } else {
    circle.style.left = `calc(${percent}% - 15px)`;
  }

  const index = Math.floor((percent / 100) * (plans.length - 1));
  showPrice(index);
}

toggle.addEventListener("click", (e) => {
  circle.style.left = "0%";
  e.target.classList.toggle("discount");
  if (e.target.classList.contains("discount")) {
    plans.forEach((ele) => {
      ele.price = ele.price * 0.75;
    });
    showPrice();
  } else {
    plans.forEach((ele) => {
      ele.price = ele.price / 0.75;
    });
    showPrice();
  }
});
