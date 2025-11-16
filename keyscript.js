const englishLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
var waitingForEnter = false;

document.addEventListener("keyup", (event) => {
	if (waitingForEnter) {
		return;
	}

	if (event.key == "Delete" || event.key == "Backspace") {
		deleteClick();
	}

	if (event.key == "Enter") {
		enterClick();
	}

	if (englishLetters.includes(event.key.toUpperCase())) {
		letterClick(event.key.toUpperCase());
	}
});
