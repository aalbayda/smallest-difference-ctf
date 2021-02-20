const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;
const level = [0]
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
app.get('/start', (req,res) => {
	let LEN = Math.floor(Math.random()*10+3);
	arr = Array.from(Array(LEN)).map(x=>Math.floor(Math.random()*100));
	res.json({arr});
})

app.post('/submit', (req, res) => {
	let answer = findMinDiff(arr);
	if (Number(req.body.ans)===answer) {
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
		level.shift()
	}
	else {
		res.sendStatus(404);
	}
});

const server = app.listen(port, ()=>console.log('connected.'))
setTimeout(()=>{
	level.pop();
	level.push(0);
	server.close();
},50000);