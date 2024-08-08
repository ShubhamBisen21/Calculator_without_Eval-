let string = "";
const regexOfOperators = /[+\-*/]/g;
const regexOfNumbers = /\d+/g;

let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach(function(button) {
    button.addEventListener('click', function(btn) {
        if (btn.target.innerHTML === "=") {
            string = total(string);
            document.querySelector(".btn-input").value = string;
        } else if (btn.target.innerHTML === 'AC') {
            string = "";
            document.querySelector(".btn-input").value = string;
        } else {
            string += btn.target.innerHTML;
            document.querySelector(".btn-input").value = string;
        }
    });
});

function total(expr) {

    let numbers = expr.match(regexOfNumbers).map(num => parseFloat(num));
    let operators = expr.match(regexOfOperators);

    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const num = numbers[i + 1];

        switch (operator) {
            case '+':
                result += num;
                break;
            case '-':
                result -= num;
                break;
            case '*':
                result *= num;
                break;
            case '/':
                result /= num;
                break;
            default:
                throw new Error('Unsupported operator');
        }
    }

    return result;
}
