const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
const errorMessageContainer = document.getElementById('error-msg');

// Fetch exchange rates and update the DOM
function calculate() {
  const firstCurrency = currencyElementOne.value;
  const secondCurrency = currencyElementTwo.value;

  let errorMessage = '',
    errorFlag = false;
  errorMessageContainer.textContent = errorMessage;

  if (amountElementOne.value <= 0) {
    errorMessage = `The above input has a value of 0 or less than 0, please correct it. `;
    errorFlag = true;
  }

  if (amountElementTwo.value <= 0) {
    errorMessage += `The below input has a value of 0 or less than 0, please correct it. `;
    errorFlag = true;
  }
  errorMessageContainer.textContent = errorMessage;
  if (errorFlag) return;

  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[secondCurrency];

      rateElement.innerText = `1 ${firstCurrency} = ${rate} ${secondCurrency} `;
      amountElementTwo.value = parseFloat(
        rate * amountElementOne.value
      ).toFixed(2);
    });
}

// Event Listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', function () {
  const tempCurrency = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = tempCurrency;

  const tempAmount = parseFloat(amountElementOne.value).toFixed(2);
  amountElementOne.value = parseFloat(amountElementTwo.value).toFixed(2);
  amountElementTwo.value = tempAmount;
  calculate();
});
