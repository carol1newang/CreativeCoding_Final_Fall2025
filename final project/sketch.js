let r = 0;
let b = 0;
let g = 0;
let mainBall;

function setup(){
	createCanvas(600, 600);
	background(255);

	mainBall = new ball(300, 300, 100);
}

function draw(){
	mainBall.display(r, g, b);
}