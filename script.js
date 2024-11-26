document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let operator = "";
    let operand1 = null;
    let resultCalculated = false; 

    display.value = ""; 

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function () {
            const value = this.getAttribute("data-value");

            if (!isNaN(value) || value === ".") {
                if (resultCalculated) {
                    currentInput = value;
                    display.value = value;
                    resultCalculated = false;
                } else {
                    if (value === "." && currentInput.includes(".")) return;

                    currentInput = currentInput === "" ? value : currentInput + value;
                    display.value += value; 
                }
            } else if (value === "C") {
                currentInput = "";
                operator = "";
                operand1 = null;
                resultCalculated = false;
                display.value = "";
            } else if (value === "=") {
                if (operator && operand1 !== null && currentInput !== "") {
                    const operand2 = parseFloat(currentInput);
                    let result;

                    if (operator === "+") {
                        result = operand1 + operand2;
                    } else if (operator === "-") {
                        result = operand1 - operand2;
                    } else if (operator === "*") {
                        result = operand1 * operand2;
                    } else if (operator === "/") {
                        result = operand2 !== 0 ? operand1 / operand2 : "Error";
                    }

                    display.value = result.toString();
                    operand1 = result;
                    currentInput = "";
                    operator = "";
                    resultCalculated = true; 
                }
            } else if (value === "backspace") {
                if (resultCalculated) {
                    return;
                }
                currentInput = currentInput.slice(0, -1);
                display.value = display.value.slice(0, -1);
            } else {
                if (resultCalculated) {
                    operand1 = parseFloat(display.value);
                    operator = value;
                    currentInput = "";
                    display.value += " " + operator + " ";
                    resultCalculated = false;
                } else if (operator) {
                    display.value = display.value.slice(0, -2) + ` ${value} `;
                    operator = value;
                } else if (currentInput !== "") {
                    operand1 = parseFloat(currentInput);
                    operator = value;
                    currentInput = "";
                    display.value += " " + operator + " ";
                }
            }
        });
    });
});
