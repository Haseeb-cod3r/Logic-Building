const li = document.querySelectorAll("li");
const drop = document.querySelectorAll(".drop");
const header = document.querySelector("header");
const h1 = document.querySelector("h1");
const loader = document.querySelector(".loader");

setTimeout(() => {
  loader.style.display = "none";
  header.style.display = "block";
  h1.style.display = "block";
}, 1500);

const filterLi = [];
li.forEach((ele) => {
  if (ele.id) {
    filterLi.push(ele);
  }
});

let id = null;
drop.forEach((drop) => {
  drop.addEventListener("mouseenter", () => {
    clearTimeout(id);
  });
  drop.addEventListener("mouseleave", () => {
    drop.style.opacity = "0";
    drop.style.pointerEvents = "none";
  });
});

filterLi.forEach((ele) => {
  ele.addEventListener("mouseenter", () => {
    const drop = document.querySelector(`.${ele.id}`);
    drop.style.opacity = "1";
    drop.style.pointerEvents = "auto";
  });
  ele.addEventListener("mouseleave", () => {
    id = setTimeout(() => {
      const drop = document.querySelector(`.${ele.id}`);
      drop.style.opacity = "0";
      drop.style.pointerEvents = "none";
    }, 10);
  });
});
