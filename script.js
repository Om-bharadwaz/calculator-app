const display = document.getElementById("display");
const themeToggleBtn = document.getElementById("themeToggle");

// --- CALCULATOR LOGIC ---

// Append number or operator to display
function appendValue(input) {
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = input;
  } else {
    display.innerText += input;
  }
}

// Clear display screen (AC)
function clearDisplay() {
  display.innerText = "0";
}

// Delete last entered character (DEL)
function deleteLast() {
  if (display.innerText.length === 1 || display.innerText === "Error") {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

// Calculate result
function calculateResult() {
  try {
    display.innerText = eval(display.innerText);
  } catch (error) {
    display.innerText = "Error";
  }
}

// --- KEYBOARD SUPPORT ---

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Numbers or decimal
  if (!isNaN(key) || key === ".") {
    appendValue(key);
  } 
  // Operators
  else if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendValue(key);
  } 
  // Enter or '=' calculates
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } 
  // Backspace deletes last character
  else if (key === "Backspace") {
    deleteLast();
  } 
  // Escape clears display (AC)
  else if (key === "Escape") {
    clearDisplay();
  }
});

// --- DARK / LIGHT THEME TOGGLE LOGIC ---

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  
  if (theme === "dark") {
    themeToggleBtn.innerText = "☀️";
  } else {
    themeToggleBtn.innerText = "🌙";
  }
}

// Load saved theme on startup (default to dark)
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);