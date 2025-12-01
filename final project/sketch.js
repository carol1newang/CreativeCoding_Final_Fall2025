let r = 0;
let b = 0;
let g = 0;
let mainBall;
let redY = 0;
let speed;
let levelR, levelG, levelB

function setup(){
	createCanvas(600, 600);
	background(50, 50, 50);
	noStroke();

	mainBall = new ball(300, 300, 400);
	redBall = new ball(random(0, width), 0, 50, 255, 0, 0);
	greenBall = new ball(random(0, width), 0, 50, 0, 255, 0);
	blueBall = new ball(random(0, width), 0, 50, 0, 0, 255);

	levelR = random(0, 3)*255/random(1,5);
	levelG = random(0, 3)*255/random(1,5);
	levelB = random(0, 3)*255/random(1,5);
}

function draw(){
	background(50, 50, 50);
	bucket();
	mainBall.main(levelR, levelG, levelB);
	redBall.display();
	redBall.drop(random(1, 3));
	greenBall.display();
	greenBall.drop(random(1, 3));
	blueBall.display();
	blueBall.drop(random(1, 3));
}

function bucket(){
	rectMode(CENTER);
	fill(r, g, b);
	rect(mouseX, height-20, 80, 40);
}