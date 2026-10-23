const display = document.getElementById("display");
const themeToggleBtn = document.getElementById("themeToggle");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// --- CALCULATOR LOGIC ---

function appendValue(input) {
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = input;
  } else {
    display.innerText += input;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  if (display.innerText.length === 1 || display.innerText === "Error") {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculateResult() {
  const expression = display.innerText;
  try {
    const result = eval(expression);
    
    // Save to history if valid expression
    if (expression !== "0" && expression !== result.toString()) {
      addHistoryItem(expression, result);
    }
    
    display.innerText = result;
  } catch (error) {
    display.innerText = "Error";
  }
}

// --- HISTORY LOGIC ---

function toggleHistory() {
  historyPanel.classList.toggle("hidden");
  renderHistory();
}

function addHistoryItem(expression, result) {
  history.unshift({ expression, result }); // Add newest to top
  if (history.length > 20) history.pop(); // Limit to 20 items

  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = `<p class="empty-msg">No calculation history yet.</p>`;
    return;
  }

  historyList.innerHTML = history.map((item) => `
    <div class="history-item" onclick="useHistoryResult('${item.result}')">
      <div class="history-expression">${item.expression} =</div>
      <div class="history-result">${item.result}</div>
    </div>
  `).join("");
}

function useHistoryResult(value) {
  display.innerText = value;
}

function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
}

// --- KEYBOARD SUPPORT ---

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    appendValue(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendValue(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
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

// Load saved theme and history on startup
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);
renderHistory();
