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

	/* Makes the letterbox have a type of style when it is filled */
	currentBox.style = "border: solid 2px;";
}

let correctLetters = [];
let correctLettersWrongPlace = [];
let wrongLetters = [];

async function enterClick() {
	if (victory) return;
	if (currentColoumn < 6) return;
	if (currentRow > 6) return;

	let theGuess = "";
	for (let i = 1; i <= 5; i++) {
		theGuess += document.getElementById(`row${currentRow}-${i}`).innerHTML;
	}

	if (!fiveWordsdict.includes(theGuess.toLowerCase())) {
		console.log("That was not an actual word.");
		return;
	}

	// Step 1: Prepare arrays and counters
	const target = wordleWord.split("");
	const guess = theGuess.split("");

	// Count letters in target
	const letterCounts = {};
	for (let letter of target) {
		letterCounts[letter] = (letterCounts[letter] || 0) + 1;
	}

	// Step 2: First pass - correct letters in correct place
	for (let i = 0; i < 5; i++) {
		const box = document.getElementById(`row${currentRow}-${i + 1}`);
		if (guess[i] === target[i]) {
			box.classList.add("correct-letter-correct-place");
			correctLetters.push(guess[i]);
			letterCounts[guess[i]] -= 1; // consume one occurrence
			guess[i] = null; // mark as handled
		}
	}

	// Step 3: Second pass - correct letters in wrong place
	for (let i = 0; i < 5; i++) {
		const box = document.getElementById(`row${currentRow}-${i + 1}`);
		const letter = guess[i];

		if (letter && letterCounts[letter] > 0) {
			box.classList.add("correct-letter-wrong-place");
			correctLettersWrongPlace.push(letter);
			letterCounts[letter] -= 1; // consume one occurrence
		} else if (letter) {
			box.classList.add("wrong-letter");
			wrongLetters.push(letter);
		}
	}

	fixLetterColors();

	currentRow += 1;
	currentColoumn = 1;

	if (theGuess === wordleWord) {
		victory = true;
		addNewStreak();
		alert("Congratulations you won!");

		const def = await fetchDefinition(wordleWord);
		alert(`The word "${wordleWord.toLowerCase()}" means: \n\n${def}`);
	}

	if (currentRow == 7 && !victory) {
		alert(`You lost. The word was "${wordleWord}".`);

		const def = await fetchDefinition(wordleWord);
		alert(`The word "${wordleWord.toLowerCase()}" means: \n\n${def}`);
	}
}

function deleteClick() {
	/* If you already have won you can't play*/
	if (victory == true) {
		return;
	}

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

	/* Makes the style when a letterbox is filled dissapear */
	lastFullBox.style = "border:lightgray solid;";

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

/* 
Replace enterClick with this to make it Back to how I made it. I'm not sure how the new code prevents the double yellow problem.


function enterClick() {
	if (victory == true) {
		return;
	}

	if (currentColoumn < 6) {
		return;
	}

	if (currentRow > 6) {
		return;
	}

	let theGuess = "";

	for (let i = 1; i <= 5; i++) {
		const box = document.getElementById(`row${currentRow}-${i}`);

		theGuess += box.innerHTML;
	}

	if (!fiveWordsdict.includes(theGuess.toLowerCase())) {
		console.log("That was not an actual word.");
		return;
	}

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

	currentRow += 1;

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
*/
