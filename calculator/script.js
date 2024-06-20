const inputValue = document.getElementById("user-input");

// Add event listeners to number buttons
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Add event listeners to operation buttons
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML.trim();
        let lastValue = inputValue.innerText.slice(-1);

        if (operation === "=") {
            if (!isNaN(lastValue)) {
                try {
                    inputValue.innerText = eval(inputValue.innerText);
                } catch {
                    inputValue.innerText = "Error";
                }
            }
        } else if (operation === "AC") {
            inputValue.innerText = "0";
        } else if (operation === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1);
            if (inputValue.innerText.length === 0) {
                inputValue.innerText = "0";
            }
        } else {
            if (!isNaN(lastValue) || lastValue === '.') {
                inputValue.innerText += operation;
            }
        }
    });
});
