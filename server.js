const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;
const level = [0]
const answer = [0];
const findMinDiff = (arr) => {
	arr.sort();
	let diff = Infinity;
	for (let i = 0; i < arr.length-1; i++) {
		if (arr[i+1] - arr[i] < diff) {
			diff = arr[i+1] - arr[i];
		}
	}
	return diff;
}
let arr = [];

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// Static pages
app.use(express.static(__dirname + '/public'));

// Routes
app.post('/', (req, res) => {
	if (level[0] === -1) {
		arr = "Time's up! I can't give you anything.";
		res.json({arr});
	}
	else if (level[0] === 0 || req.body.ans === String(answer[0])) {
		level.push(level[0]+1);
		if (level[0] < 10) {
			let LEN = Math.floor(Math.random()*20+3);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*100));
		}
		else if (level[0] >= 10 && level[0] < 20) {
			let LEN = Math.floor(Math.random()*80+10);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*500));
		}
		else if (level[0] >= 20 && level[0] < 30) {
			let LEN = Math.floor(Math.random()*200+30);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*800));
		}
		else if (level[0] >= 30 && level[0] < 39) {
			let LEN = Math.floor(Math.random()*300+50);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*1000));
		}
		else if (level[0] == 39) {
			arr = "flag{youFuckingNerdHaveALlama}";
		}
		answer.pop();
		answer.push(findMinDiff(arr));
		console.log(answer[0]);
		level.shift();
		res.json({arr});
	}
	else {
		level.shift();
		level.push(0);
		res.sendStatus(404);
	}
});

const server = app.listen(port, ()=>console.log('connected.'))
setTimeout(()=>{
	level.pop();
	level.push(-1);
},50000);