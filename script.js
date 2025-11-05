// const wordleWord = "BRAVE";

var currentRow = 1;
var currentColoumn = 1;

let victory = false;

function letterClick(letter) {
	if (victory == true) {
		return;
	}

	/* Makes sure that no more boxes can be filled if the row is full*/
	if (currentColoumn == 6 || currentRow > 6) {
		return;
	}

	/* Finds the correct box*/
	const currentBox = document.getElementById(
		`row${currentRow}-${currentColoumn}`
	);
	currentBox.innerHTML = letter;

	/* Updates to the next box in the row*/
	currentColoumn += 1;
}

let correctLetters = [];
let correctLettersWrongPlace = [];
let wrongLetters = [];

function enterClick() {
	/* If you already have won you can't play*/
	if (victory == true) {
		return;
	}

	/* Makes sure that the row is filled before proceding */
	if (currentColoumn < 6) {
		return;
	}

	/* Makes sure that not all the chances have been used up*/
	if (currentRow > 6) {
		return;
	}

	let theGuess = "";

	/* 
	Creates the guess word
	
	? don't know if this is the best way to do it
	*/
	for (let i = 1; i <= 5; i++) {
		const box = document.getElementById(`row${currentRow}-${i}`);

		theGuess += box.innerHTML;
	}

	if (!fiveWordsdict.includes(theGuess.toLowerCase())) {
		console.log("That was not an actual word.");
		return;
	}

	/* Goes through all the boxes and checks if it is correct in comperrasion to the wordle word*/

	for (let i = 1; i <= 5; i++) {
		const box = document.getElementById(`row${currentRow}-${i}`);

		if (box.innerHTML == wordleWord[i]) {
			box.classList.add("correct-letter-correct-place");
			correctLetters.push(box.innerHTML);
		} else if (wordleWord.includes(box.innerHTML)) {
			correctLettersWrongPlace.push(box.innerHTML);
			box.classList.add("correct-letter-wrong-place");
		} else {
			wrongLetters.push(box.innerHTML);
			box.classList.add("wrong-letter");
		}
	}
	fixLetterColors();

	/* Increases the row to the next try*/
	currentRow += 1;

	/* Also makes sure the row starts at zero*/
	currentColoumn = 1;

	if (theGuess === wordleWord) {
		victory = true;
		alert("Congratulations you won!");
	}

	if (currentRow == 7 && victory == false) {
		console.log(
			`You lost. You are out of tries. The word was "${wordleWord}".`
		);
	}
}

function deleteClick() {
	/* If you already have won you can't play*/
	if (victory == true) {
		return;
	}

	console.log("current column", currentColoumn);

	let lastFullBox;

	/* Finds and empties the latest filled box */
	lastFullBox = document.getElementById(
		`row${currentRow}-${currentColoumn - 1}`
	);

	if (currentColoumn == 1) {
		lastFullBox = document.getElementById(
			`row${currentRow}-${currentColoumn}`
		);
	}

	lastFullBox.innerHTML = "";

	/* Makes sure currentColumn doesnt come to 0*/
	if (currentColoumn == 1) {
		return;
	}
	currentColoumn -= 1;
}

function fixLetterColors() {
	for (let i = 0; i < wrongLetters.length; i++) {
		const letter = document.getElementById(`letter-${wrongLetters[i]}`);
		letter.classList.remove("correct-letter-correct-place");
		letter.classList.remove("correct-letter-wrong-place");
		letter.classList.add("wrong-letter");
	}

	for (let i = 0; i < correctLettersWrongPlace.length; i++) {
		const letter = document.getElementById(
			`letter-${correctLettersWrongPlace[i]}`
		);
		letter.classList.remove("correct-letter-correct-place");
		letter.classList.remove("wrong-letter");
		letter.classList.add("correct-letter-wrong-place");
	}

	for (let i = 0; i < correctLetters.length; i++) {
		const letter = document.getElementById(`letter-${correctLetters[i]}`);
		letter.classList.remove("wrong-letter");
		letter.classList.remove("correct-letter-wrong-place");
		letter.classList.add("correct-letter-correct-place");
	}
}
