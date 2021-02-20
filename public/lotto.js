// Generate lottery numbers
const generateNumber = () => {
	let r = Math.random()*100;
	return Math.floor(r);
};

const showResults = () => {
	const results = [];
	const guesses = [];

	// Validate guess input
	let guessesInvalid = false;
	document.querySelectorAll('.guess').forEach(e => {
		if (e.value.length === 0 || !Number.isInteger(Number(e.value)) || (Number(e.value) < 0)) {
			guessesInvalid = true;
		}
		guesses.push(e.value);
	});
	if (guessesInvalid === true) {
		alert('Please fill in your ballot properly.');
		return;
	}

	// Reveal draw results
	document.querySelector('.play').className = "play-hidden";
	document.querySelector('#draws-hidden').id = "draws";
	for (let i = 1; i < 7; i++) {
		setTimeout(()=>{
			results.push(String(generateNumber()));
			let query = `#res${i}`;
			document.querySelector(query).className=`div-result`;
			document.querySelector(query).firstChild.value = results[i-1];
		}, 1000*i)
	}

	// Test if you've won
	setTimeout(() => {
		fetch('/', {
			method: "POST",
	        headers: { "Content-Type": "application/json" },
	        body: JSON.stringify({results, guesses})
		}).then(res=>res).then(data=>data.text().then(d=>{alert(JSON.parse(d)["msg"])}));

		// Restart page
		document.querySelectorAll('.guess').forEach(e => e.value = '');
		document.querySelectorAll('.div-result').forEach(e => {
			e.value = '';
			e.className = 'hidden';
		});
		document.querySelector('#draws').id = "draws-hidden";
		document.querySelector('.play-hidden').className = "play";
	}, 7100)
}

document.querySelector('button').addEventListener('click', e => e.preventDefault());