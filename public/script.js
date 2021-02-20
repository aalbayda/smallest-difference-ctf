let round = 0;
let timer = true;

const start = async () => {
	document.querySelector('.hidden').className = '';
	document.querySelector('#btn-container').innerHTML = '<button id="button" onclick="submit()">Submit</button>';
	document.querySelector('#challenge').innerHTML = await fetch('/', {
		method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ans:0})
	}).then(res=>res.json()).then(data=>data["arr"]);
	document.querySelector('#round').innerHTML = `Round ${++round}`;
}

const submit = async () => {
	document.querySelector('#challenge').innerHTML = await fetch('/', {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({ans:document.querySelector('input').value})
	}).then(res=>res.json()).then(data=>data["arr"]).catch(err=>{
		window.alert('Wrong answer!');
		window.location.reload();
	});
	document.querySelector('input').value = '';
	document.querySelector('#round').innerHTML = `Round ${++round}`;
}

if(timer)setTimeout(()=>{window.alert("Time's up!!");window.location.reload()}, 50000);