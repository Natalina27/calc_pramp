// Let's first define the operators and their functions
const operations = {
    "÷": function(a,b) { return a/b;},
    "×": function(a,b) { return a*b;},
    "-": function(a,b) { return a-b;},
    // using parseFloat is necessary, otherwise it will result in string concatenation
    "+": function(a,b) { return parseFloat(a)+parseFloat(b);}
}

const operatorChars = Object.keys(operations);
const input = document.getElementById('input'); // input/output button
const numbers = document.querySelectorAll('.numbers div'); // number buttons
const operators = document.querySelectorAll('.operators div'); // operator buttons
const result = document.getElementById('result'); // equal button
const clear = document.getElementById('clear'); // clear button
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function(e) {
        // storing current input string and its last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // if result is not diplayed, just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;

            // if result is currently displayed and user pressed an operator
        } else if (resultDisplayed === true && operatorChars.indexOf(lastChar) >= 0) {

            // we need to keep on adding to the string for next operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;

            // if result is currently displayed and user pressed a number
        } else {

            // we need clear the input string and add the new input to start the new opration
            resultDisplayed = false;
            input.innerHTML = e.target.innerHTML;
        }

    });
}

// adding click handlers to operator buttons
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function(e) {

        // storing current input string and its last character in variables - used later
        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];
        // if last character entered is an operator, replace it with the currently pressed one
        if (operatorChars.indexOf(lastChar) >= 0) {
            const newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;

            // if this isn't the first key pressed
        } else if (currentString.length !== 0) {

            // else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// on click of 'equal' button
result.addEventListener("click", function() {

    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = input.innerHTML;
    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/[+\-×÷]/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    // now we are looping through the array and doing one operation at a time.
    // the operations will execute according to their order in the operatorChars array
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output
    const operatorChars = Object.keys(operations);
    for (let i = 0; i < operatorChars.length; i++) {
        const currentOperator = operatorChars[i];
        const currentOperation = operations[currentOperator];
        let nextOperationToExecute = operators.indexOf(currentOperator);
        while (nextOperationToExecute !== -1) {
            const nextResult = currentOperation(numbers[nextOperationToExecute], numbers[nextOperationToExecute + 1]);
            numbers.splice(nextOperationToExecute, 2, nextResult);
            operators.splice(nextOperationToExecute, 1);
            nextOperationToExecute = operators.indexOf(currentOperator);
        }
    }

    input.innerHTML = numbers[0]; // displaying the output
    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})
