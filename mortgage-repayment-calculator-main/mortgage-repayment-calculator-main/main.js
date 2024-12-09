const radioBtn = document.querySelectorAll('.js-radio-btn');
const radioContainer = document.querySelectorAll('.js-radio-container');
radioBtn.forEach((elm, i) => {
  elm.addEventListener('click', () => {
    // remove style from every radio container
    radioContainer.forEach(elm => {
      elm.classList.remove('js-checked-radio');
    });

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

// calculate mortgage and retun mortgage payment monthly
function calculateMortgage() {
  // getting inputs value
  const amount = Number(amountElm.value);
  const interest = Number(interestRateElm.value);
  const term = Number(termElm.value);

  // Convert annual interest rate to monthly interest rate
  let monthlyInterestRate = interest / 12 / 100;
  // Total number of payments (months)
  let numberOfPayments = term * 12;
  // Formula to calculate the monthly mortgage payment
  let monthlyPayment = amount * monthlyInterestRate / 
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  // Calculate the total amount paid over the life of the loan
  let totalPayment = monthlyPayment * numberOfPayments;
  // Calculate the total interest paid
  let totalInterest = totalPayment - amount;
      
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

    if (elm.value === '') {
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

    if (evaluated === 'repayment') {
      monthlyElm.innerHTML = `$${mortgagePayment.monthlyPayment}`;
      totalElm.innerHTML = `$${mortgagePayment.totalPayment}`;
    } else {
      monthlyElm.innerHTML = `$${mortgagePayment.monthlyInterest}`;
      totalElm.innerHTML = `$${mortgagePayment.totalInterest}`;
    }
  }
}






















