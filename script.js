let string = "";
let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach(function (button) {
  button.addEventListener("click", function (btn) {
    if (btn.target.innerHTML === "=") {
      string = total(string);
      document.querySelector(".btn-input").value = string;
    } else if (btn.target.innerHTML === "AC") {
      string = "";
      document.querySelector(".btn-input").value = string;
    } else {
      string += btn.target.innerHTML;
      document.querySelector(".btn-input").value = string;
    }
  });
});

function evaluate(expr) {
  return Function('"use strict";return (' + expr + ')')();
}

function handleParentheses(expr) {
  let result = expr;
  let start = -1;
  let end = -1;
  let parensCount = 0;

  while (true) {
    start = -1;
    end = -1;
    parensCount = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i] === '(') {
        if (parensCount === 0) {
          start = i;
        }
        parensCount++;
      } else if (result[i] === ')') {
        parensCount--;
        if (parensCount === 0) {
          end = i;
          break;
        }
      }
    }

    if (start === -1 || end === -1) break; // No more parentheses
    
    const innerExpr = result.slice(start + 1, end); // Evaluate the innermost parentheses
    const evaluated = evaluate(innerExpr);

    result = result.slice(0, start) + evaluated + result.slice(end + 1);
  }

  return result;
}

function total(expr) {
  const noParenthesesExpr = handleParentheses(expr);
  return evaluate(noParenthesesExpr);
}
