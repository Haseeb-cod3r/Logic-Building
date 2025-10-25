const btn = document.querySelector("button");
const adviceContainer = document.getElementById("advice");
const wait = document.getElementById("wait");
async function getAdvice() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");

    if (!res.ok === "true") {
      throw new Error("something went wrong");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(`something went wrong ${err}`);
  }
}
btn.addEventListener("click", () => {
  getAdvice().then(({ slip: { advice } }) => {
    adviceContainer.innerText = advice;
  });
  wait.style.opacity = "1";
  btn.style.cursor = "not-allowed";
  setTimeout(() => {
    btn.style.cursor = "pointer";
    wait.style.opacity = "0";
  }, 2000);
});
btn.click();
