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
    // Parse input values
    const grossIncome = parseFloat(grossIncomeInput.value);
    const extraIncome = extraIncomeInput.value ? parseFloat(extraIncomeInput.value) : 0;
    const deductions = deductionsInput.value ? parseFloat(deductionsInput.value) : 0;

    const isGrossIncomeValid = validateGrossIncome(grossIncome);
    const isExtraIncomeValid = validateExtraIncome(extraIncome);
    const isDeductionsValid = validateDeductionAmmout(deductions);

    if (!isGrossIncomeValid || !isExtraIncomeValid || !isDeductionsValid) {
        return; // Exit if any validation fails
    }


    if (!ageGroup?.value) {
        console.log("back");
        hasError = true;
    }


    // Calculate taxable income
    const totalIncome = grossIncome + extraIncome - deductionsInput.value;
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
    Tax.textContent = taxAmount.toString();

    // Display modal with calculated tax
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

// Function to show error icon
const showErrorIcon = (element) => {
    element.style.display = "inline"; // Show the icon
}

// Function to hide error icon
const hideErrorIcon = (element) => {
    element.style.display = "none"; // Hide the icon
}


// Validate numeric inputs
const validateGrossIncome = (value) => {
    if (isNaN(value) || parseFloat(value) <= 0) {
        grossIncomeError.textContent = "Gross Income must be a positive number";
        grossIncomeIcon.style.color = "red"; // Show error icon in red color
        return false;
    } else {
        hideErrorIcon(grossIncomeIcon);
        grossIncomeIcon.style.color = ""; // Reset icon color if no error
    }
    return true;
}

const validateExtraIncome = (value) => {
    if (value && (isNaN(value) || parseFloat(value) < 0)) {
        extraIncomeError.textContent = "Extra Income must be a non-negative number";
        extraIncomeIcon.style.color = "red"; // Show error icon in red color
        return false;
    } else {
        hideErrorIcon(extraIncomeIcon)
        extraIncomeIcon.style.color = ""; // Reset icon color if no error
    }
    return true;
}

const validateDeductionAmmout = (value) => {
    if (value && (isNaN(value) || parseFloat(value) < 0)) {
        deductionError.textContent = "Deductions must be a non-negative number";
        deductionIcon.style.color = "red"; // Show error icon in red color
        return false;
    } else {
        hideErrorIcon(deductionIcon)
        deductionIcon.style.color = ""; // Reset icon color if no error
    }
    return true;
}