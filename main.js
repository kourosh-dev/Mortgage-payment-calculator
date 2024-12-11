// style to checked and unchecked radio button 
const radioBtn = document.querySelectorAll('.js-radio-btn');
const radioContainer = document.querySelectorAll('.js-radio-container');

// remove style from radio
function removeStyleOfRadio() {
  radioContainer.forEach(elm => {
    elm.classList.remove('js-checked-radio');
  });
}

radioBtn.forEach((elm, i) => {
  elm.addEventListener('click', () => {
    // remove style from every radio container
    removeStyleOfRadio();

    // add style to checked radio container
    if (elm.checked) {
      radioContainer[i].classList.add('js-checked-radio');
    }
  });
});

// select input element
const amountElm = document.querySelector('.js-amount-input');
const interestRateElm = document.querySelector('.js-intrest-input');
const termElm = document.querySelector('.js-term-input');
let values;

// getting inputs value and and save it in object
function saveInputValues() {
  values = {
    amount: amountElm.value,
    term: Number(termElm.value),
    interest: Number(interestRateElm.value)
  };
}

// calculate mortgage and retun mortgage payment monthly
function calculateMortgage() {
  // getting inputs value and and save it in object
  saveInputValues();
  // remove comma from input
  removedCommas();

  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = values.interest / 12 / 100;
  // Total number of payments (months)
  const numberOfPayments = values.term * 12;
  // Formula to calculate the monthly mortgage payment
  const monthlyPayment = values.amount * monthlyInterestRate / 
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  // Calculate the total amount paid over the life of the loan
  const totalPayment = monthlyPayment * numberOfPayments;
  // Calculate the total interest paid
  const totalInterest = totalPayment - values.amount;
      
  // Format numbers with commas
  const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);
  
  // Return an object with all calculated values
  return {
    monthlyPayment: formatNumber(monthlyPayment.toFixed(2)),  // Monthly payment (principal + interest)
    totalPayment: formatNumber(totalPayment.toFixed(2)),      // Total amount paid (principal + interest)
    monthlyInterest: formatNumber((totalInterest / numberOfPayments).toFixed(2)), // Average monthly interest
    totalInterest: formatNumber(totalInterest.toFixed(2))    // Total interest paid
  };
}

// evaluation inputs
function evaluation() {
  // select text input
  const inputs = document.querySelectorAll('.js-input');
  const inputsContainer = document.querySelectorAll('.js-input-text-container');
  const errorMassage = document.querySelectorAll('.js-error-massage');
  let evaluated = 0;

  inputs.forEach((elm, i) => {
    elm.addEventListener('click', () => {
      inputsContainer[i].classList.remove('js-error-style');
      errorMassage[i].style.display = 'none';
    });
  });

  Object.keys(values).forEach((key, i) => {
    if (values[key] === '' || isNaN(values[key]) || values[key] <= 0) {
      inputsContainer[i].classList.add('js-error-style');
      errorMassage[i].style.display = 'inline';
      evaluated++;
    } 
  });

  const checkedRadio = document.querySelector('input[name="result-type"]:checked');
  const errorRadio = document.querySelector('.js-error-massage-radio');

  if (!checkedRadio) {
    errorRadio.style.display = 'inline';
  } else {
    errorRadio.style.display = 'none';
  }

  if (!evaluated && checkedRadio) {
    return checkedRadio.value;
  }
}

// select submit element
const submitEml = document.querySelector('.js-calc-btn');
// run render payment when button is clicked
submitEml.addEventListener('click', () => {
  renderPayment();
});

// render calulated result
function renderPayment() {
  // calcuate mortgage payment and save result in variable
  const mortgagePayment = calculateMortgage();
  // evaluation inputs
  const evaluated = evaluation();

  // select elemnt that rendering payment
  const noResult = document.querySelector('.js-empty-result');
  const result = document.querySelector('.js-result');
  const monthlyElm = document.querySelector('.js-monthly-repayment');
  const totalElm = document.querySelector('.js-total-repayment');

  // render result
  if (evaluated) {
    noResult.style.display = 'none';
    result.style.display = 'block';

    // click reset input 
    const resetBtn = document.getElementById('js-reset-form');
    resetBtn.click();

    // remove style from radio button
    removeStyleOfRadio();

    if (evaluated === 'repayment') {
      monthlyElm.innerHTML = `$${mortgagePayment.monthlyPayment}`;
      totalElm.innerHTML = `$${mortgagePayment.totalPayment}`;
    } else {
      monthlyElm.innerHTML = `$${mortgagePayment.monthlyInterest}`;
      totalElm.innerHTML = `$${mortgagePayment.totalInterest}`;
    }
  }
}

// Format the input value with commas as the user types
amountElm.addEventListener('input', function (e) {
  // Remove any existing commas
  const rawValue = e.target.value.replace(/,/g, '');

  // Check if the input is a valid number
  if (!isNaN(rawValue) && rawValue !== '') {
    // Format the number with commas
    const formattedValue = new Intl.NumberFormat('en-US').format(rawValue);
    // Set the formatted value back to the input field
    e.target.value = formattedValue;
  } else if (rawValue === '') {
    e.target.value = ''; // Allow empty input
  }
});

// Get the raw numerical value when the button is clicked
function removedCommas() {
  // Remove commas from the input field value
  const rawValue = values.amount.replace(/,/g, '');

  if (rawValue && !isNaN(rawValue)) {
    values.amount = parseFloat(Number(rawValue));
  }
};






















