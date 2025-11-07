var vetlesWordleStreak;

function getCurrentStreak() {
	const json = localStorage.getItem("vetlesWordleStreak");

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);

	// Dette kan gjøre skape feil når datoen er 1.
	yesterday.setDate(today.getDate() - 1);

	console.log(
		`todays time: ${today.getTime()}, yesterday ${yesterday.getTime()}, json: ${
			JSON.parse(json).date
		}`
	);

	/* Checks if there is any saved streak */
	if (!json) {
		const streak = {
			streak: 0,
			date: today.getTime(),
		};

		localStorage.setItem("vetlesWordleStreak", JSON.stringify(streak));
		vetlesWordleStreak = streak;
	}

	// Checks if the last streak was longer ago than yesterday
	else if (
		today.getTime() > JSON.parse(json).date &&
		yesterday.getTime() > JSON.parse(json).date
	) {
		console.log("yesterdays time was too big");

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const streak = {
			streak: 0,
			date: today.getTime(),
		};

		localStorage.setItem("vetlesWordleStreak", JSON.stringify(streak));
		vetlesWordleStreak = streak;

		// If the streak was from yesterday
	} else {
		vetlesWordleStreak = JSON.parse(json);
	}

	setStreakDivAs(vetlesWordleStreak.streak);
}

function addNewStreak() {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	if (
		today.getTime() > vetlesWordleStreak.date &&
		vetlesWordleStreak.date == yesterday.getTime()
	) {
		vetlesWordleStreak.streak += 1;
		vetlesWordleStreak.date = today.getTime();

		const json = JSON.stringify(vetlesWordleStreak);
		localStorage.setItem("vetlesWordleStreak", json);
	}

	if (
		today.getTime() == vetlesWordleStreak.date &&
		vetlesWordleStreak.streak == 0
	) {
		vetlesWordleStreak.streak = 1;
		const json = JSON.stringify(vetlesWordleStreak);
		localStorage.setItem("vetlesWordleStreak", json);
	}

	setStreakDivAs(vetlesWordleStreak.streak);
}

const streakDiv = document.getElementById("streak");

function setStreakDivAs(streakNumber) {
	streakDiv.innerHTML = `🔥Daily Streak: ${streakNumber}`;
}

getCurrentStreak();
