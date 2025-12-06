let r = 0;
let b = 0;
let g = 0;
let mainBall;
let redY = 0;
let speed;
let levelR, levelG, levelB;
let randomR, randomG, randomB;
let reds = [];
let greens = [];
let blues = [];
let levelSet = false;
let startSet = true;
let newLevel = false;
let nextLevelScreen = false;

function setup(){
	createCanvas(600, 600);
	background(50, 50, 50);
	noStroke();

	mainBall = new ball(300, 300, 400);

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-200, 0);
		let s = 50;
		let r = 255;
		let g = 0;
		let b = 0;
		reds.push(new ball(x, y, s, r, g, b));
	}

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-200, 0);
		let s = 50;
		let r = 0;
		let g = 255;
		let b = 0;
		greens.push(new ball(x, y, s, r, g, b));

	}

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-200, 0);
		let s = 50;
		let r = 0;
		let g = 0;
		let b = 255;
		blues.push(new ball(x, y, s, r, g, b));

	}
  }

function draw(){
  background(50, 50, 50);
  if(startSet == true){
    startPage();
  }

  if(levelSet == true){
    resetLevel();
    levelSet = false;
    newLevel = true;
    print(levelSet);
    print(newLevel);
  }
  
  if(newLevel == true){
    level();
  }
  
  if(nextLevelScreen == true){
    nextLevel();
  }
}

function startPage(){
  background(10, 10, 10);
  fill(255);
  textAlign(CENTER);
  textSize(50);
  text('START GAME?', 300, 300);
  rect(200, 400, 200, 100);
}

function resetLevel (){
    r = 0;
    g = 0;
    b = 0
  	randomR = int(random(0, 3));
	randomG = int(random(0, 3));
	randomB = int(random(0, 3));
	levelR = randomR*85;
	levelG = randomG*85;
	levelB = randomB*85;
}

function level(){
	bucket();
	mainBall.main(levelR, levelG, levelB);

    fill(255);
    textAlign(CENTER);
    textSize(20);
    text('R = ' + randomR + '/6, G = ' + randomG + '/6, B = ' + randomB + '/6', 300, 300);
   
    for (let i = 0; i < reds.length; i++) {
	reds[i].display();
	reds[i].drop(random(0.1, 5));
	greens[i].display();
	greens[i].drop(random(0.1, 5));
	blues[i].display();
	blues[i].drop(random(0.1, 5));
    }
  	if(r == levelR && g == levelG && b == levelB){
	  nextLevelScreen = true;
      newLevel = false;
	}
  
    if(r > levelR || g > levelG || b > levelB){
      levelSet = true;
      r = 0;
      g = 0;
      b = 0;
    }
}

function nextLevel(){
	background(r, g, b);
    fill(255);
    text('NEXT LEVEL', 300, 300);
    rectMode(CENTER);
    rect(200, 400, 200, 100);

}

function bucket(){
	rectMode(CENTER);
	fill(r, g, b);
	rect(mouseX, height-20, 80, 40);
}

function mousePressed() {
  if (startSet) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 400 && mouseY < 500) {
      startSet = false;
      levelSet = true;
      newLevel = true;
    }
  }
  if(nextLevelScreen){
    if (mouseX > 200 && mouseX < 400 && mouseY > 400 && mouseY < 500){
      newLevel = true;
      levelSet = true;
      nextLevelScreen = false;
    }
  }
}