const billInputEl = document.getElementById("bill-input");
const tipsEl = document.querySelectorAll(".tip");
const tipCustomEl = document.querySelector(".tip-custom");
const peopleInputEl = document.getElementById("people-input");
const tipPersonEl = document.querySelector(".tip-person");
const tipTotalEl = document.querySelector(".tip-total");
const resetBtn = document.querySelector(".reset-btn");
const small = document.querySelector("small");
let tipPercentage = 0;

function calculateTipAmountAndTotal() {
  const billAmount = parseFloat(billInputEl.value);
  const numOfPeople = parseInt(peopleInputEl.value);

  if (
    isNaN(billAmount) ||
    isNaN(numOfPeople) ||
    billAmount <= 0 ||
    numOfPeople < 0
  ) {
    tipPersonEl.textContent = "$0.00";
    tipTotalEl.textContent = "$0.00";
    return;
  }

  if (numOfPeople === 0) {
    small.style.display = "block";
    peopleInputEl.style.border = "2px solid red";
    peopleInputEl.style.borderRadius = "4px";
    peopleInputEl.classList.remove("focus:outline-strongCyan");
    tipPersonEl.textContent = "$0.00";
    tipTotalEl.textContent = "$0.00";
  } else {
    small.style.display = "none";
    peopleInputEl.style.border = "none";
    peopleInputEl.classList.add("focus:outline-strongCyan");

    const tipPerPerson = (billAmount * tipPercentage) / 100 / numOfPeople;
    const totalPerPerson = billAmount / numOfPeople + tipPerPerson;

    tipPersonEl.textContent = `$${tipPerPerson.toFixed(2)}`;
    tipTotalEl.textContent = `$${totalPerPerson.toFixed(2)}`;
  }
}

// Event Listeners
billInputEl.addEventListener("input", calculateTipAmountAndTotal);
peopleInputEl.addEventListener("input", calculateTipAmountAndTotal);

tipsEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipsEl.forEach((tip) => {
      tip.classList.remove("active");
    });
    btn.classList.add("active");

    tipPercentage = parseFloat(btn.textContent);

    calculateTipAmountAndTotal();
  });
});

resetBtn.addEventListener("click", () => {
  billInputEl.value = "";
  tipPersonEl.textContent = "$0.00";
  tipTotalEl.textContent = "$0.00";
  tipCustomEl.textContent = "Custom";
  tipsEl.forEach((tip) => {
    tip.classList.remove("active");
  });
});

tipCustomEl.addEventListener("click", () => {
  tipsEl.forEach((tip) => {
    tip.classList.remove("active");
  });

  let customTip = prompt("Enter custom tip percentage (1-100): ");
  while (customTip !== null) {
    customTip = parseFloat(customTip);
    if (!isNaN(customTip) && customTip >= 1 && customTip <= 100) {
      tipsEl.forEach((tip) => {
        tip.classList.remove("active");
      });
      tipPercentage = customTip;
      tipCustomEl.textContent = `${customTip}%`;
      tipCustomEl.classList.add("active");
      tipCustomEl.calculateTipAmountAndTotal();
      break;
    } else {
      customTip = prompt(
        "Inladiv input. Please enter a number from 1 to 100: "
      );
    }
  }
});
