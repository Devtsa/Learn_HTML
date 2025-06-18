// State management
let currentValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Display element
const display = document.querySelector('.display-content');

// Core functions
export function handleNumber(num) {
    if (waitingForSecondOperand) {
        currentValue = num;
        waitingForSecondOperand = false;
    } else {
        currentValue = currentValue === '0' ? num : currentValue + num;
    }
    updateDisplay();
}

export function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentValue);
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        currentValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }
    
    operator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

export function calculate(first, second, op) {
    switch(op) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return first / second;
        default: return second;
    }
}

export function clearDisplay() {
    currentValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

export function backspace() {
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay();
}

export function handleEquals() {
    if (!operator) return;
    
    const inputValue = parseFloat(currentValue);
    
    if (operator && !waitingForSecondOperand) {
        currentValue = `${parseFloat(
            calculate(firstOperand, inputValue, operator).toFixed(7)
        )}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
    updateDisplay();
}

export function updateDisplay() {
    display.textContent = currentValue;
}

updateDisplay();
