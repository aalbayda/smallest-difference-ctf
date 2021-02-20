const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;
const level = [0]
const answer = [0];
const findMinDiff = (arr) => {
	let sortedArr = [...arr].sort();
	let diff = Infinity;
	for (let i = 0; i < sortedArr.length-1; i++) {
		if (sortedArr[i+1] - sortedArr[i] < diff) {
			diff = sortedArr[i+1] - sortedArr[i];
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
	if (level[0] === 0 || req.body.ans === String(answer[0])) {
		level.push(level[0]+1);
		if (level[0] < 10) {
			let LEN = Math.floor(Math.random()*90+3);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*100));
		}
		else if (level[0] >= 10 && level[0] < 20) {
			let LEN = Math.floor(Math.random()*500+10);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*500));
		}
		else if (level[0] >= 20 && level[0] < 30) {
			let LEN = Math.floor(Math.random()*800+30);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*800));
		}
		else if (level[0] >= 30 && level[0] < 40) {
			let LEN = Math.floor(Math.random()*1000+50);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*1000));
		}
		else if (level[0] >= 40 && level[0] < 50) {
			let LEN = Math.floor(Math.random()*1600+50);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*1500));
		}
		else if (level[0] >= 50 && level[0] < 60) {
			let LEN = Math.floor(Math.random()*1800+50);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*2500));
		}
		else if (level[0] >= 60 && level[0] < 70) {
			let LEN = Math.floor(Math.random()*1900+500);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*3000));
		}
		else if (level[0] >= 70 && level[0] < 80) {
			let LEN = Math.floor(Math.random()*2000+500);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*3500));
		}
		else if (level[0] >= 80 && level[0] < 90) {
			let LEN = Math.floor(Math.random()*3500+500);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*4000));
		}
		else if (level[0] >= 80 && level[0] < 100) {
			let LEN = Math.floor(Math.random()*5000+500);
			arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*5000));
		}
		else if (level[0] == 100) {
			arr = "flag{godYouNerdHaveALlama}";
			res.json({arr});
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
		res.json({arr:"Wrong answer!"});
	}
});

const server = app.listen(port, ()=>console.log('connected.'))
// setTimeout(()=>{
// 	level.pop();
// 	level.push(-1);
// },10000);