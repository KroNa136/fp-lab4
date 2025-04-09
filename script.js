var add = function (x) { return function (y) { return x + y; }; };
var subtract = function (x) { return function (y) { return x - y; }; };
var multiply = function (x) { return function (y) { return x * y; }; };
var divide = function (x) { return function (y) { return x / y; }; };
var power = function (x) { return function (y) { return Math.pow(x, y); }; };
var squareRoot = function (x) { return Math.sqrt(x); };
;
;
var unaryOperations = {
    items: [
        { name: "square-root", execute: squareRoot }
    ]
};
var binaryOperations = {
    items: [
        { name: "add", execute: add },
        { name: "subtract", execute: subtract },
        { name: "multiply", execute: multiply },
        { name: "divide", execute: divide },
        { name: "power", execute: power }
    ]
};
var findOperation = function (predicate) { return function (operationCollection) {
    return operationCollection.items.find(predicate);
}; };
var findOperationByName = function (name) {
    return findOperation(function (operation) { return operation.name === name; });
};
var findUnaryOperationByName = function (name) { return findOperationByName(name)(unaryOperations); };
var findBinaryOperationByName = function (name) { return findOperationByName(name)(binaryOperations); };
var isUnaryOperation = function (name) { return typeof findUnaryOperationByName(name) !== "undefined"; };
var isBinaryOperation = function (name) { return typeof findBinaryOperationByName(name) !== "undefined"; };
var numberToString = function (x) {
    return isNaN(x) ? "не число" :
        x == Number.POSITIVE_INFINITY ? '∞' :
            x == Number.NEGATIVE_INFINITY ? "-∞" :
                x.toString();
};
var firstNumberInput = document.getElementById("first-number-input");
var operationSelect = document.getElementById("operation-select");
var secondNumberInput = document.getElementById("second-number-input");
var calculateButton = document.getElementById("calculate-button");
var answerInput = document.getElementById("answer-input");
if (firstNumberInput instanceof HTMLInputElement &&
    operationSelect instanceof HTMLSelectElement &&
    secondNumberInput instanceof HTMLInputElement &&
    calculateButton instanceof HTMLButtonElement &&
    answerInput instanceof HTMLInputElement) {
    operationSelect.onchange = function (e) {
        if (isUnaryOperation(e.target.value)) {
            firstNumberInput.toggleAttribute("readonly", true);
            firstNumberInput.classList.add("input-readonly");
        }
        else {
            firstNumberInput.toggleAttribute("readonly", false);
            firstNumberInput.classList.remove("input-readonly");
        }
    };
    calculateButton.onclick = function () {
        var firstNumber = Number(firstNumberInput.value);
        var secondNumber = Number(secondNumberInput.value);
        var operationName = operationSelect.value;
        answerInput.value = isUnaryOperation(operationName) ? numberToString(findUnaryOperationByName(operationName).execute(secondNumber)) :
            isBinaryOperation(operationName) ? numberToString(findBinaryOperationByName(operationName).execute(firstNumber)(secondNumber)) :
                "Операция не распознана";
    };
}
//# sourceMappingURL=script.js.map