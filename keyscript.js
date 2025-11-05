const englishLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

document.addEventListener("keyup", (event) => {
	if (event.key == "Delete" || event.key == "Backspace") {
		deleteClick();
	}

	if (event.key == "Enter") {
		enterClick();
	}

	console.log(event.key);
	if (englishLetters.includes(event.key.toUpperCase())) {
		letterClick(event.key.toUpperCase());
	}
});
