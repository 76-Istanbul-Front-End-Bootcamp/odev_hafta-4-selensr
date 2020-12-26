const data = {
  USD: {EUR: 0.82, GBP: 0.74, TL: 0.13},
  EUR: {USD: 1.23, GBP: 0.91, TL: 0.11},
  GBP: {USD: 1.35, EUR: 1.10, TL: 0.099},
  TL: {USD: 7.56, EUR: 9.20, GBP: 10.30},
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName){
  for(let i =0; i< elements.length; i++){
    const currencyKeyDiv   = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  const amount = document.querySelector("input[name='amount']").value;

  const currencyResult = document.querySelector("#currency-result");

  const fromTarget = document.querySelector(
    "input[name='currency_from']:checked"
  )?.value;
  const toTarget = document.querySelector("input[name='currency_to']:checked")
    ?.value;

  if (!fromTarget || !toTarget) {
    currencyResult.innerHTML = "Seçimler yapmalısınız";
  } else if (isNaN(amount)) {
    currencyResult.innerHTML = "Amount bir sayı olmalı";
  } else if (fromTarget === toTarget) {
    currencyResult.innerHTML = "Farklı seçimler yapmalısınız";
  } else {
    const currentCurrencyObject = data[fromTarget];
    const resultForOne = currentCurrencyObject[toTarget];
    const result = amount * resultForOne;
    currencyResult.innerHTML =
      amount + " " + fromTarget + " = " + result + " " + toTarget;
  }
});
