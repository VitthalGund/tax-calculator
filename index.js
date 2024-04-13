// @ts-checks
const ageGroupInputFieldShow = document.getElementById("ageGroupIcon");
const deductionInputFieldShow = document.getElementById("deduction");
const extraIncomeInputFieldShow = document.getElementById("extraIncome");
const grossIncomeInputFieldShow = document.getElementById("grossIncome");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");

const grossIncomeError = document.getElementById("grossIncomeError");
const deductionError = document.getElementById("deductionError");
const extraIncomeError = document.getElementById("extraIncomeError");
const ageGroupError = document.getElementById("ageGroupError");

const grossIncomeIcon = document.getElementById("grossIncomeIcon");
const deductionIcon = document.getElementById("deductionIcon");
const extraIncomeIcon = document.getElementById("extraIncomeIcon");
const ageIcon = document.getElementById("ageGroopIcon");




let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    if (modal)
        modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

if (closeBtn || closeBtn !== null)
    closeButton?.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);



// Get form elements
const grossIncomeInput = document.getElementById("gross-income-ammout");
const extraIncomeInput = document.getElementById("extra-income-ammout");
const deductionsInput = document.getElementById("deduction-ammout");
const ageGroup = document.getElementById("ageGroup");
const errorIcons = document.querySelectorAll(".error-icon");
const Tax = document.getElementById("taxAble");

function calculateTax(e) {
    e.preventDefault();
    // Validate inputs (basic validation, can be extended)
    console.log({ grossIncomeInput: grossIncomeInput.value, extraIncomeInput: extraIncomeInput.value, deductionsInput: deductionsInput.value, ageGroup: ageGroup.value })
    let hasError = false;
    if (!grossIncomeInput?.value) {
        grossIncomeError.textContent = parseInt(grossIncomeInput?.value) > 0 ? "Enter valid input" : "Gross Income connot be negative or zero";
        grossIncomeIcon.style.color = "red";
        hasError = true;
        console.log("back");
    }
    if (!extraIncomeInput?.value || +extraIncomeInput?.value > 0) {
        console.log("back");
        extraIncomeError.textContent = parseInt(extraIncomeInput?.value) > 0 ? "Enter valid input" : "Extra Income connot be negative or zero";
        extraIncomeIcon.style.color = "red";
        extraIncomeInput.value = 0;
    }
    if (!deductionsInput?.value || + deductionsInput?.value > 0) {
        console.log("back");
        deductionError.textContent = parseInt(deductionsInput?.value) > 0 ? "Enter valid input" : "Deduction About connot be negative or zero";
        deductionIcon.style.color = "red";
        deductionsInput.value = 0;
    }

    if (!ageGroup?.value) {
        console.log("back");
        hasError = true;
    }

    if (hasError) {
        console.log("back");
        return; // Don't proceed if there are errors
    }

    // Calculate taxable income
    const totalIncome = parseFloat(grossIncomeInput.value) + parseFloat(extraIncomeInput.value) - parseFloat(deductionsInput.value);
    const taxableIncome = Math.max(0, totalIncome - 800000); // Ensures minimum taxable income is 0

    // Calculate tax based on age
    let taxRate;

    if (ageGroup?.value === "<40") {
        taxRate = 0.3;
    } else if (ageGroup?.value === "<60") {
        taxRate = 0.4;
    } else {
        taxRate = 0.1;
    }

    // Calculate final tax amount
    const taxAmount = taxableIncome * taxRate;
    console.log(taxAmount)
    // Display modal with calculated tax
    Tax.textContent = taxAmount.toString();
    deductionIcon.style.display = "none";
    grossIncomeIcon.style.display = "none";
    extraIncomeIcon.style.display = "none";
    toggleModal();
}

function changeSvgColor() {
    const svgElements = document.querySelectorAll("svg.exclamation path");

    for (const svg of svgElements) {
        svg.style.fill = "red"; // Change color to red
    }
}

// Call the function to apply the color change
changeSvgColor();

if (submitBtn)
    submitBtn.addEventListener("click", (e) => {
        calculateTax(e);
    });


const validateGrossIncome = (value) => {
    if (!value || !value.isnumeric()) {
        grossIncomeIcon.style.color = "red";
    }
}
const validateExtraIncome = (value) => {
    if (value || !value.isnumeric()) {
        extraIncomeIcon.style.color = "red";
    }
}
const validateDeductionAmmout = (value) => {
    if (value || !value.isnumeric()) {
        deductionIcon.style.color = "red";
    }
}