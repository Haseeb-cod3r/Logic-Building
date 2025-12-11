const them = document.getElementById("darkLight");
const bg = document.getElementById("bg");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const input = document.getElementById("input");
const sec3 = document.querySelector(".sec3");
const sec4 = document.querySelector(".sec4");
const all = document.getElementById("all");

function display() {
  const data = localStorage.getItem("data");
  if (data) {
    sec3.innerHTML = data;
  }
}
display();

function saveData() {
  if (sec3.children) {
    Array.from(sec3.children).forEach((ele) => {
      ele.style.display = "flex";
    });
  }

  localStorage.setItem("data", sec3.innerHTML);
}
// ================= them logic ==================

them.addEventListener("click", (e) => {
  if (e.target.getAttribute("src") === "images/icon-sun.svg") {
    e.target.setAttribute("src", "images/icon-moon.svg");
    bg.setAttribute("src", "./images/bg-desktop-light.jpg");
    body.classList.toggle("dark");
  } else {
    e.target.setAttribute("src", "images/icon-sun.svg");
    bg.setAttribute("src", "./images/bg-desktop-dark.jpg");
    body.classList.toggle("dark");
  }
  saveData();
});

//================ calculating task count =============

function calculateTask(sec3) {
  const taskCount = document.getElementById("taskCount");
  if (sec3.children.length === 0) {
    taskCount.innerText = "No items";
  } else {
    taskCount.innerText = `${sec3.children.length} items left`;
  }
  saveData();
}
calculateTask(sec3);

// ========== creating new task ===============

function createTask(text) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.innerHTML = ` <div class="circle">
            <img src="./images/icon-check.svg" alt="" id="check" class="noselect"/>
          </div>
          <p id="task">${text}</p>
          <img src="./images/icon-cross.svg" alt="" id="delete" class="noselect" />`;
  return taskContainer;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value) {
    const taskContainer = createTask(e.target.value);
    sec3.append(taskContainer);
    e.target.value = "";
    calculateTask(sec3);
  }
  saveData();
});

container.addEventListener("click", (e) => {
  // =========== active task color changed ==================

  if (e.target.id === "task") {
    if (!(e.target.closest(".task-container").id === "complete")) {
      e.target.closest(".task-container").classList.toggle("active");
    }
  }

  // =============== completed tasks logic ====================

  if (e.target.classList[0] === "circle") {
    if (e.target.closest(".task-container").id === "complete") {
      e.target.closest(".task-container").id = "none";
      const p = e.target.closest(".task-container").children[1];
      p.style.textDecoration = "none";
      p.style.opacity = "1";
      p.style.cursor = "pointer";
      p.style.pointerEvents = "all";
    } else {
      e.target.closest(".task-container").id = "complete";
      const p = e.target.closest(".task-container").children[1];
      p.style.textDecoration = "line-through";
      p.style.opacity = "0.5";
      p.style.cursor = "not-allowed";

      // ====== removing active class because task is completed ===========

      e.target.closest(".task-container").classList.remove("active");
    }
  }

  // ========== deleting task ===============

  if (e.target.id === "delete") {
    e.target.closest(".task-container").remove();
    calculateTask(sec3);
  }

  // ================= filter options handling ===============
  if (e.target.classList.contains("bottomBtn")) {
    const arrOfSec4Children = Array.from(e.target.parentElement.children);
    arrOfSec4Children.forEach((ele) => {
      if (ele.classList.contains("selected")) {
        ele.classList.remove("selected");
        e.target.classList.add("selected");
      }
    });
  }

  // =========== clear all task ==================

  if (e.target.id === "clear") {
    Array.from(sec3.children).forEach((ele) => {
      ele.remove();
      localStorage.removeItem("data");
    });
  }
  saveData();
  // ============ filtering All ========================
  if (e.target.id === "all") {
    const taskContainer = document.querySelectorAll(".task-container");
    taskContainer.forEach((ele) => {
      if (ele.classList.contains("task-container")) {
        ele.style.display = "flex";
      }
    });
  }

  // ============ filtering active ========================

  if (e.target.id === "active") {
    const taskContainer = document.querySelectorAll(".task-container");
    taskContainer.forEach((ele) => {
      if (ele.classList.contains("active")) {
        ele.style.display = "flex";
      } else {
        ele.style.display = "none";
      }
    });
  }

  // ============ filtering complete ========================

  if (e.target.id === "complete") {
    const taskContainer = document.querySelectorAll(".task-container");
    taskContainer.forEach((ele) => {
      if (ele.id === "complete") {
        ele.style.display = "flex";
      } else {
        ele.style.display = "none";
      }
    });
  }
});
