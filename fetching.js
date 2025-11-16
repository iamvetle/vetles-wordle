var wordleWord;
var fiveWordsdict;

fetch("/answer-bank.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error(
				"Network response was not ok: " + response.statusText
			);
		}
		return response.json(); // Already parsed JSON
	})
	.then((data) => {
		const randomIndex = Math.floor(Math.random() * data.length);
		wordleWord = data[randomIndex].toUpperCase();
	})
	.catch((error) => {
		console.error("There was a problem with the fetch operation:", error);
	});

fetch("/quess-bank.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error(
				"Network response was not ok: " + response.statusText
			);
		}
		return response.json(); // Already parsed JSON
	})
	.then((data) => {
		fiveWordsdict = data;
	})
	.catch((error) => {
		console.error("There was a problem with the fetch operation:", error);
	});

async function retrieveDictionary() {
	return fetch("/dictionary.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					"Network response was not ok: " + response.statusText
				);
			}
			return response.json(); // Already parsed JSON
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation:",
				error
			);
		});
}

let dictionary;

async function init() {
	dictionary = await retrieveDictionary();
}

init();

function fetchDefinition(word) {
	return dictionary[word.toLowerCase()];
}
