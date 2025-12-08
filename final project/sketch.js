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
let levelNumber = 1;
let attempts = 1;
let finishSet = false;

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
  }
  
  if(newLevel == true){
    level();
  }
  if(levelNumber == 5 && nextLevelScreen == true){
     finishScreen();
  }
  else if(nextLevelScreen == true){
    nextLevel();
  }
}

function finishScreen(){
  background(0);
  fill(255)
  ellipse(300, 300, 400, 400);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text('CONGRATS!', 300, 210);
  text('YOU COMPLETED 5 LEVELS!', 300, 240);
  textSize(50);
  text('PLAY AGAIN?', 300, 315);
  
  finishSet = true;
}

function startPage(){
  background(0);
  fill(255)
  ellipse(300, 300, 400, 400);
  fill(0);
  textAlign(CENTER);
  textSize(50);
  text('START GAME', 300, 315);
  levelNumber = 1;
}

function resetLevel (){
  r = 0;
  g = 0;
  b = 0;
  
  randomR = int(random(0, 3));
  randomG = int(random(0, 3));
  randomB = int(random(0, 3));
  
  levelR = randomR*85;
  levelG = randomG*85;
  levelB = randomB*85;

  for (let i = 0; i < reds.length; i++) {
    reds[i].x = random(0, width);
    reds[i].y = random(-200, 0);
    greens[i].x = random(0, width);
    greens[i].y = random(-200, 0);
    blues[i].x = random(0, width);
    blues[i].y = random(-200, 0);
  }
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
      attempts += 1;
      r = 0;
      g = 0;
      b = 0;
      background(255, 0, 0);
      for (let i = 0; i < reds.length; i++) {
        reds[i].x = random(0, width);
        reds[i].y = random(-200, 0);
        greens[i].x = random(0, width);
        greens[i].y = random(-200, 0);
        blues[i].x = random(0, width);
        blues[i].y = random(-200, 0);
      }
    }
}

function nextLevel(){
	background(r, g, b);
    fill(255);
    ellipse(300, 300, 400, 400);
    fill(r, g, b);
    textSize(45);
    text('NEXT LEVEL', 300, 310);
    textSize(20);
    text('LEVEL ' + levelNumber + ' COMPLETE', 300, 210);
    text('ATTEMPTS: ' + attempts, 300, 400);
}

function bucket(){
	rectMode(CENTER);
	fill(r, g, b);
	rect(mouseX, height-10, 80, 40);
}

function mousePressed() {
  if (startSet) {
    if (dist(mouseX, mouseY, 300, 300) < 200) {
      startSet = false;
      levelSet = true;
      newLevel = true;
    }
  }
  if(nextLevelScreen){
    if (dist(mouseX, mouseY, 300, 300) < 200){
      newLevel = true;
      levelSet = true;
      nextLevelScreen = false;
      attempts = 1;
      levelNumber = levelNumber+1;
    }
  }
  if(finishSet){
    if (dist(mouseX, mouseY, 300, 300) < 200) {
      startSet = true;
      levelNumber = 1;
      levelSet = false;
      newLevel = false;
      finishSet = false;
    }
  }
}