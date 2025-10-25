const notificationContainer = document.querySelector(".notificaion-container");
const notificaions = document.querySelectorAll(".notification");
const circle = document.querySelectorAll("#circle");
const markAll = document.getElementById("mark-all");
const details = document.querySelectorAll("details");
const counter = document.getElementById("counter");

notificationContainer.addEventListener("click", (e) => {
  if (e.target.parentElement.tagName === "SUMMARY") {
    e.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
      "#fff";
    e.target.parentElement.parentElement.parentElement.parentElement.id =
      "white";
    e.target.childNodes.forEach((ele) => {
      if (ele.id === "circle") {
        ele.style.display = "none";
      }
    });
    calculateCounter();
  }
  if (e.target.parentElement.tagName === "P") {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
      "#fff";
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id =
      "white";
    e.target.parentElement.childNodes.forEach((ele) => {
      if (ele.id === "circle") {
        ele.style.display = "none";
      }
    });
    calculateCounter();
  }
});

markAll.addEventListener("click", (e) => {
  notificaions.forEach((ele) => {
    ele.children[1].children[0].children[0].children[0].children[1].click();
  });
  details.forEach((ele) => {
    ele.removeAttribute("open");
  });
  calculateCounter();
});

function calculateCounter() {
  let length = notificationContainer.children.length;
  notificationContainer.childNodes.forEach((ele) => {
    if (ele.id === "white") {
      length -= 1;
    }
  });
  counter.innerText = length;
}
calculateCounter();
