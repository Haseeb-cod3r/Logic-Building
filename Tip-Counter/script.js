const bill = document.getElementById("bill");
const grid = document.querySelector(".grid");
const custom = document.querySelector(".custom");
const people = document.getElementById("people");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const btn = document.querySelector("button");
const billErr = document.getElementById("bill-err");
const tipErr = document.getElementById("tip-err");
const peopleErr = document.getElementById("people-err");

let billAmount = null;
let TipPercentage = null;
let numberOfPeople = null;
function display() {
  if (billAmount && TipPercentage && numberOfPeople) {
    const tipAmount = ((billAmount / 100) * TipPercentage) / numberOfPeople;
    const totalAmount = billAmount / numberOfPeople + tipAmount;

    amount.innerText = `$${tipAmount.toFixed(2)}`;
    total.innerText = `$${totalAmount.toFixed(2)}`;
  } else {
    amount.innerText = "$0.00";
    total.innerText = "$0.00";
  }
}

function getBillAmount() {
  let value = bill.value;
  if (/^\$?(?!0+(?:\.0+)?$)\d*(?:\.\d+)?\$?$/.test(value)) {
    billErr.style.display = "none";
    if (value.includes("$")) {
      let index = value.indexOf("$");
      value = value.slice(0, index) + value.slice(index + 1);
    }
    billAmount = Number(value);
    display();
  } else {
    billErr.style.display = "block";
    display();
  }
}
bill.addEventListener("input", getBillAmount);

function getTipPercentage() {
  const gridChild = grid.children;
  const percentage = Array.from(gridChild).filter((ele) => {
    return ele.id === "active";
  });

  if (percentage[0].tagName === "DIV") {
    let value = percentage[0].innerText;
    if (/^(?!0+(?:\.0+)?$)\d*(?:\.\d+)?%?$/.test(value)) {
      tipErr.style.display = "none";
      if (value.includes("%")) {
        value = value.slice(0, -1);
        TipPercentage = Number(value);
        display();
      } else {
        TipPercentage = Number(value);
        display();
      }
    } else {
      tipErr.style.display = "block";
      display();
    }
  }
  if (percentage[0].tagName === "INPUT") {
    let value = percentage[0].value;
    if (/^(?!0+(?:\.0+)?$)\d*(?:\.\d+)?%?$/.test(value)) {
      tipErr.style.display = "none";
      if (value.includes("%")) {
        value = value.slice(0, -1);
        TipPercentage = Number(value);
        display();
      } else {
        TipPercentage = Number(value);
        display();
      }
    } else {
      tipErr.style.display = "block";
      display();
    }
  }
}

custom.addEventListener("input", getTipPercentage);
grid.addEventListener("click", (e) => {
  const active = document.getElementById("active");
  if (active) {
    active.removeAttribute("id");
  }
  if (e.target.tagName === "DIV") {
    e.target.id = "active";
    getTipPercentage();
  }
  if (e.target.tagName === "INPUT") {
    e.target.id = "active";
  }
});

function getNumberOfPeople() {
  const value = people.value;
  if (/^(?!0+$)\d*$/.test(value)) {
    peopleErr.style.display = "none";
    numberOfPeople = Number(value);
    display();
  } else {
    peopleErr.style.display = "block";
    display();
  }
}

people.addEventListener("input", getNumberOfPeople);
btn.addEventListener("click", () => {
  billAmount = null;
  TipPercentage = null;
  numberOfPeople = null;
  bill.value = "";
  custom.value = "";
  people.value = "";
  amount.innerText = "$0.00";
  total.innerText = "$0.00";
  const active = document.getElementById("active");
  if (active) {
    active.removeAttribute("id");
  }
});
