async function getData() {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("Network Error");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error in fetching JSON:", error);
  }
}

const charts = document.querySelector(".charts");
const totalAmount = document.getElementById("total-amount");

getData().then((data) => {
  let counter = 1;
  const maxAmount = Math.max(
    ...data.map((obj) => {
      return obj.amount;
    })
  );
  let totalAmountCounter = 0;

  data.forEach((ele) => {
    const chart = document.createElement("div");
    const height = (ele.amount / maxAmount) * 100;
    chart.classList.add("chart");
    chart.classList.add(`chart${counter}`);
    counter++;
    chart.innerHTML = `<div class="amount">$${ele.amount}</div>
          <div class="bar" style="height:${height}%;"></div>
          <div class="day">${ele.day}</div>`;
    charts.append(chart);
    totalAmountCounter += ele.amount;
  });
  totalAmount.innerText = `$${totalAmountCounter.toFixed(2)} `;
});
