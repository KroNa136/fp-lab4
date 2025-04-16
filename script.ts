// Операции над числами

const add = (x: number) => (y: number): number => x + y;
const subtract = (x: number) => (y: number): number => x - y;
const multiply = (x: number) => (y: number): number => x * y;
const divide = (x: number) => (y: number): number => x / y;
const power = (x: number) => (y: number): number => Math.pow(x, y);
const squareRoot = (x: number): number => Math.sqrt(x);

interface Operation<T> {
    name: string,
    execute: T
};

const unaryOperations: Operation<(x: number) => number>[] = [
    { name: "square-root", execute: squareRoot }
];

const binaryOperations: Operation<(x: number) => (y: number) => number>[] = [
    { name: "add", execute: add },
    { name: "subtract", execute: subtract },
    { name: "multiply", execute: multiply },
    { name: "divide", execute: divide },
    { name: "power", execute: power }
];

// Получение и проверка существования операций по названию

const findOperation = <T>(predicate: (value: Operation<T>) => boolean) => (collection: Operation<T>[]): Operation<T> | undefined =>
    collection.find(predicate);

const findOperationByName = (name: string): <T>(collection: Operation<T>[]) => Operation<T> | undefined =>
    findOperation((operation) => operation.name === name);

const findUnaryOperationByName = (name: string) => findOperationByName(name)(unaryOperations);
const findBinaryOperationByName = (name: string) => findOperationByName(name)(binaryOperations);

const isUnaryOperation = (name: string): boolean => typeof findUnaryOperationByName(name) !== "undefined";
const isBinaryOperation = (name: string): boolean => typeof findBinaryOperationByName(name) !== "undefined";

// Обработка значений, возвращаемых из операций

const numberToString = (x: number): string =>
    isNaN(x) ? "не число" :
    x == Number.POSITIVE_INFINITY ? '∞' :
    x == Number.NEGATIVE_INFINITY ? "-∞" :
    x.toString();

// Получение элементов интерфейса

const firstNumberInput: HTMLElement | null = document.getElementById("first-number-input");
const operationSelect: HTMLElement | null = document.getElementById("operation-select");
const secondNumberInput: HTMLElement | null = document.getElementById("second-number-input");
const calculateButton: HTMLElement | null = document.getElementById("calculate-button");
const answerInput: HTMLElement | null = document.getElementById("answer-input");

// Обработчики событий интерфейса

if (firstNumberInput instanceof HTMLInputElement &&
    operationSelect instanceof HTMLSelectElement &&
    secondNumberInput instanceof HTMLInputElement &&
    calculateButton instanceof HTMLButtonElement &&
    answerInput instanceof HTMLInputElement) {

    // Отключение поля ввода первого числа при выборе унарной операции

    operationSelect.onchange = (e: Event) => {
        if (isUnaryOperation((e.target as HTMLSelectElement).value)) {
            firstNumberInput.toggleAttribute("readonly", true);
            firstNumberInput.classList.add("input-readonly");
        } else {
            firstNumberInput.toggleAttribute("readonly", false);
            firstNumberInput.classList.remove("input-readonly");
        }
    };

    // Нажатие на кнопку "="

    calculateButton.onclick = () => {
        const firstNumber: number = Number(firstNumberInput.value);
        const secondNumber: number = Number(secondNumberInput.value);
        const operationName: string = operationSelect.value;

        answerInput.value = isUnaryOperation(operationName) ? numberToString(findUnaryOperationByName(operationName).execute(secondNumber)) :
                            isBinaryOperation(operationName) ? numberToString(findBinaryOperationByName(operationName).execute(firstNumber)(secondNumber)) :
                            "Операция не распознана";
    };
}
