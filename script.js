class Calculator {
  constructor() {
    this.display = document.querySelector(".display");
    this.currentInput = "";
    this.previousInput = "";
    this.operation = undefined;
    this.shouldResetScreen = false;

    this.display.textContent = "0";
    this.setupEventListeners();
    this.setupThemeSwitcher;
  }

  setupThemeSwitcher() {
    const themeSlider = document.getElementById("myRange");
    if (!themeSlider) return;
    console.log("hello world");

    const savedTheme = localStorage.getItem("calculatorTheme") || "0";
    document.body.className = `theme-${savedTheme}`;
    themeSlider.value = savedTheme;

    themeSlider.addEventListener("input", function () {
      const theme = this.value;
      document.body.className = `theme-${theme}`;
      localStorage.setItem("calculatorTheme", theme);
    });
  }

  getButtonValue(button) {
    const pTag = button.querySelector("P");
    if (pTag) {
      return pTag.textContent.trim();
    }
    return button.textContent.trim();
  }

  setupEventListeners() {
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.textContent.trim();
        if (!isNaN(value) || value === ".") {
          this.appendNumber(value);
        } else if (["+", "-", "x", "/"].includes(value)) {
          this.setOperation(value);
        }
      });
    });

    document.querySelector(".buttonSubmit").addEventListener("click", () => {
      this.calculate();
    });

    document.querySelectorAll(".buttonBlue").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.textContent === "DEL") {
          this.delete();
        } else if (button.textContent === "RESET") {
          this.reset();
        }
      });
    });
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentInput = "";
      this.showResetScreen = false;
    }

    if (number === "." && this.currentInput.includes(".")) return;
    if (number === "0" && this.currentInput === "0") return;
    if (this.currentInput === "0" && number !== ".") {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }
    this.updateDisplay();
  }

  setOperation(operator) {
    if (this.currentInput === "") return;
    if (this.previousInput !== "") {
      this.calculate();
    }
    this.operation = operator;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  calculate() {
    if (
      this.operation === undefined ||
      this.previousInput === "" ||
      this.currentInput === ""
    )
      return;

    let computation;

    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          alert("Cannot Divide by Zero");
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentInput = Math.round(computation * 1000000) / 1000000;
    this.operation = undefined;
    this.previousInput = "";
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  delete() {
    if (this.currentInput === "") return;
    this.currentInput = this.currentInput.toString().slice(0, -1);
    if (this.currentInput === "") {
      this.currentInput = "0";
    }
    this.updateDisplay();
  }

  reset() {
    this.currentInput = "0";
    this.previousInput = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent = this.currentInput || "0";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Calculator();
});
