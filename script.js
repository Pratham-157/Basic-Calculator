document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
    }

    // Function to handle button clicks
    function handleButtonClick(value) {
        if (['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal'].includes(value)) {
            if (value === 'decimal' && !currentInput.includes('.')) {
                currentInput += '.';
            } else if (value !== 'decimal') {
                currentInput += value.replace('zero', '0')
                                    .replace('one', '1')
                                    .replace('two', '2')
                                    .replace('three', '3')
                                    .replace('four', '4')
                                    .replace('five', '5')
                                    .replace('six', '6')
                                    .replace('seven', '7')
                                    .replace('eight', '8')
                                    .replace('nine', '9');
            }
            updateDisplay(currentInput);
        } else if (value === 'clear') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            secondOperand = '';
            updateDisplay('');
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(value)) {
            firstOperand = currentInput;
            operator = value;
            currentInput = '';
        } else if (value === 'equals') {
            secondOperand = currentInput;
            currentInput = performCalculation(firstOperand, operator, secondOperand);
            updateDisplay(currentInput);
            firstOperand = '';
            operator = '';
            secondOperand = '';
        }
    }

    // Function to perform calculation
    function performCalculation(firstOperand, operator, secondOperand) {
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);
        switch (operator) {
            case 'add':
                return (firstOperand + secondOperand).toString();
            case 'subtract':
                return (firstOperand - secondOperand).toString();
            case 'multiply':
                return (firstOperand * secondOperand).toString();
            case 'divide':
                return (secondOperand !== 0 ? (firstOperand / secondOperand).toString() : 'Error');
            default:
                return '';
        }
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', (e) => handleButtonClick(e.target.id));
    });

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const keyMapping = {
            '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
            '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
            '8': 'eight', '9': 'nine', '.': 'decimal',
            '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide',
            'Enter': 'equals', 'Escape': 'clear'
        };
        if (keyMapping[key]) {
            handleButtonClick(keyMapping[key]);
        }
    });
});
