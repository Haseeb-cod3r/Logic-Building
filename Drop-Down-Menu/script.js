const li = document.querySelectorAll("li");
const drop = document.querySelectorAll(".drop");

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
  });
});

filterLi.forEach((ele) => {
  ele.addEventListener("mouseenter", () => {
    const drop = document.querySelector(`.${ele.id}`);
    drop.style.opacity = "1";
  });
  ele.addEventListener("mouseleave", () => {
    id = setTimeout(() => {
      const drop = document.querySelector(`.${ele.id}`);
      drop.style.opacity = "0";
    }, 10);
  });
});
