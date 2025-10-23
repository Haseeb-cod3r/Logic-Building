async function getData() {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("Network Error");
    }

    const data = await res.json();
    renderElement(data);
    return data;
  } catch (error) {
    console.error("Error in fetching JSON:", error);
  }
}

function renderElement(data) {
  let containerCart = document.querySelector(".cart-container");

  data.forEach((data, i) => {
    let cart = document.createElement("div");
    cart.classList.add("cart");
    cart.innerHTML = ` <div class="cart-top">
            <img src="${data.image.desktop}" alt="" />
            <div class="add-to-cart" id =${i}>
              <img src="assets/images/icon-add-to-cart.svg" alt="" id =${i} />
              <p class="addToCart" id =${i}>Add to Cart</p>
            </div>
            <div class="number">
              <img
                src="assets/images/icon-decrement-quantity.svg"
                alt=""
                id="decrement"
              />
              <p id="counter-for-cart">1</p>
              <img
                src="assets/images/icon-increment-quantity.svg"
                alt=""
                id="increment"
              />
            </div>
          </div>

          <div class="cart-bottom">
            <h4>${data.category}</h4>
            <p>${data.name}</p>
            <h3>$${data.price}</h3>
          </div>`;
    containerCart.appendChild(cart);
  });
}
const promise = getData();
const container = document.querySelector(".container");
const cartContainer = document.querySelector(".cart-container");
const itemListBottom = document.querySelector(".item-list-bottom");
const itemListBottomImg = document.getElementById("item-list-bottom-img");
const itemListBottomP = document.getElementById("item-list-bottom-p");
const orderTotal = document.querySelector(".order-total");
const counterForItemListHeading = document.querySelector(
  ".counter-for-item-list-heading"
);
const orderTotalAmount = document.getElementById("total-amount");
const OrderConfirmed = document.querySelector(".order-confirmed");
const btn = document.getElementById("btn");

function total() {
  let itemListBottomArr = Array.from(itemListBottom.children);
  const total = itemListBottomArr.reduce((acc, curr) => {
    if (curr.tagName === "DIV") {
      let value = curr.children[0].children[1].children[2].innerText.slice(1);
      let num = Number(value);
      return acc + num;
    }
    return acc;
  }, 0);

  orderTotalAmount.innerText = `${total}`;
  return total;
}

cartContainer.addEventListener("click", (e) => {
  if (e.target.parentElement.className === "add-to-cart") {
    const addToCart = document.querySelectorAll(".add-to-cart");
    const number = document.querySelectorAll(".number");

    itemListBottomImg.style.display = "none";
    itemListBottomP.style.display = "none";
    addToCart[e.target.id].style.display = "none";
    number[e.target.id].style.display = "flex";
    orderTotal.style.display = "flex";
    OrderConfirmed.style.display = "flex";

    promise.then((data) => {
      const itemInfo = data[e.target.id];
      const div = document.createElement("div");
      div.innerHTML = `<div class="list-of-item">
            <h1>${itemInfo.name}</h1>
            <div class="item-list-info">
              <p><span class="counter-for-item-list-info" id = '${itemInfo.category}'>1</span>x</p>
              <p>@$${itemInfo.price}</p>
              <p>$<span id="$${itemInfo.price}">${itemInfo.price}</span></p>
              <img
                src="./assets/images/icon-remove-item.svg"
                alt=""
                id="remove"
              />
            </div>
           `;

      itemListBottom.append(div);
      total();
    });

    counterForItemListHeading.innerText =
      +counterForItemListHeading.innerText + 1;
  }

  if (e.target.parentElement.className === "number") {
    if (e.target.id === "increment") {
      const counterForListInfoArr = document.querySelectorAll(
        ".counter-for-item-list-info"
      );
      const counterForListInfo = Array.from(counterForListInfoArr).filter(
        (ele) => {
          return (
            ele.id ===
            e.target.parentElement.parentElement.parentElement.children[1]
              .children[0].innerText
          );
        }
      );
      const transformArr = Array.from(e.target.parentElement.childNodes);
      const filterArr = transformArr.filter((ele) => {
        return ele.id === "counter-for-cart";
      });
      const counterForCart = filterArr[0];
      counterForCart.innerText = +counterForCart.innerText + 1;
      counterForListInfo[0].innerText = +counterForListInfo[0].innerText + 1;

      const totalAmount = document.getElementById(
        `${e.target.parentElement.parentElement.parentElement.children[1].children[2].innerText}`
      );
      const fixedAmountt =
        e.target.parentElement.parentElement.parentElement.children[1]
          .children[2].innerText;
      const fixedAmount = +fixedAmountt.slice(1);
      totalAmount.innerText = +totalAmount.innerText + fixedAmount;

      total();
    } else if (e.target.id === "decrement") {
      const counterForListInfoArr = document.querySelectorAll(
        ".counter-for-item-list-info"
      );
      const counterForListInfo = Array.from(counterForListInfoArr).filter(
        (ele) => {
          return (
            ele.id ===
            e.target.parentElement.parentElement.parentElement.children[1]
              .children[0].innerText
          );
        }
      );
      const transformArr = Array.from(e.target.parentElement.childNodes);
      const filterArr = transformArr.filter((ele) => {
        return ele.id === "counter-for-cart";
      });
      const counterForCart = filterArr[0];
      counterForCart.innerText =
        counterForCart.innerText <= 0
          ? counterForCart.innerText
          : +counterForCart.innerText - 1;

      counterForListInfo[0].innerText =
        counterForListInfo[0].innerText <= 0
          ? counterForListInfo[0].innerText
          : +counterForListInfo[0].innerText - 1;

      const totalAmount = document.getElementById(
        `${e.target.parentElement.parentElement.parentElement.children[1].children[2].innerText}`
      );
      const fixedAmountt =
        e.target.parentElement.parentElement.parentElement.children[1]
          .children[2].innerText;
      const fixedAmount = parseInt(fixedAmountt.slice(1));

      if (counterForListInfo[0].innerText == 0) {
        totalAmount.innerText = "0";
      } else {
        totalAmount.innerText =
          totalAmount.innerText <= fixedAmount
            ? fixedAmount
            : +totalAmount.innerText - fixedAmount;
      }

      total();
    }
  }
});

itemListBottom.addEventListener("click", (e) => {
  if (e.target.id === "remove") {
    e.target.parentElement.parentElement.parentElement.remove();
    counterForItemListHeading.innerText =
      counterForItemListHeading.innerText <= 0
        ? counterForItemListHeading
        : +counterForItemListHeading.innerText - 1;
    const numberArr = document.querySelectorAll(".number");
    const addToCartArr = document.querySelectorAll(".add-to-cart");
    const addToCart = Array.from(addToCartArr).filter((ele) => {
      return (
        ele.parentElement.parentElement.children[1].children[1].innerText ===
        e.target.parentElement.parentElement.children[0].innerText
      );
    });
    const number = Array.from(numberArr).filter((ele) => {
      return (
        ele.parentElement.parentElement.children[1].children[1].innerText ===
        e.target.parentElement.parentElement.children[0].innerText
      );
    });
    number[0].style.display = "none";
    addToCart[0].style.display = "flex";
    if (itemListBottom.children.length === 2) {
      itemListBottomImg.style.display = "block";
      itemListBottomP.style.display = "block";
      orderTotal.style.display = "none";
      OrderConfirmed.style.display = "none";
    }

    total();
  }
});

btn.addEventListener("click", (e) => {
  const div = document.createElement("div");
  div.classList.add("over-lay");
  const infoo = document.createElement("div");

  let childArr = null;
  (childArr = Array.from(itemListBottom.children)),
    childArr.forEach((ele) => {
      if (ele.tagName === "DIV") {
        promise.then((data) => {
          const elee = data.filter((elee) => {
            return elee.name == ele.children[0].children[0].innerText;
          });

          const divv = document.createElement("div");
          divv.classList.add("list-container");
          divv.innerHTML = `
              <img src="${elee[0].image.thumbnail}" alt="">
              <div class="info">
              <h2>${ele.children[0].children[0].innerText}</h2>
                <div class="more-info">
                    <p><span id="counter-for-more-info">${ele.children[0].children[1].children[0].children[0].innerText}</span>x</p>
                    <p >$ <span id="price">${ele.children[0].children[1].children[2].children[0].innerText}</span> </p>
                </div>
                </div>
                 <div ><span id="total-price">${ele.children[0].children[1].children[2].innerText}</span></div>`;

          infoo.append(divv);
        });
      }
    });

  div.innerHTML = `<div class="pop">
        <img src="./assets/images/icon-order-confirmed.svg" alt="">
        <h1>Order Confirmed</h1>
        <p>We hope you enjoy your food!</p>
        <div class="list">   
        </div>
        <div class="order-total-price">$<span id="order-total-price">${total()}</span></div>
        <button id="btn2">Start New Order</button>
    </div>`;
  container.append(div);
  const list = document.querySelector(".list");
  list.append(infoo);

  const btn2 = document.getElementById("btn2");

  btn2.addEventListener("click", (e) => {
    div.remove();
    const number = document.querySelectorAll(".number");
    const numArr = Array.from(number);
    const filterNumArr = numArr.filter((ele) => {
      return ele.getAttribute("style");
    });
    filterNumArr.forEach((ele) => {
      ele.style.display = "none";
    });

    const addToCartArr = document.querySelectorAll(".add-to-cart");
    const addToCart = Array.from(addToCartArr).filter((ele) => {
      return ele.getAttribute("style");
    });

    addToCart.forEach((ele) => {
      ele.style.display = "flex";
    });

    const remove = document.querySelectorAll("#remove");
    remove.forEach((ele) => {
      if (ele.tagName === "IMG") {
        ele.click();
      }
    });
  });
});
