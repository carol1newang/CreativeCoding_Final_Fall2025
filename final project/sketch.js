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
let attemptsCounter = 0;
let frac = 2;

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
  }
  
  if(newLevel == true){
    level();
  }
  if(levelNumber == 6 && nextLevelScreen == true){
     finishScreen();
  }
  else if(nextLevelScreen == true){
    nextLevel();
  }
}

function finishScreen(){
  finishSet = true;
  background(0);
  fill(255)
  ellipse(300, 300, 380, 380);
  textAlign(CENTER);
  textSize(25);
  text('YOU COMPLETED 6 LEVELS!', 300, 70);
  text('TOTAL ATTEMPTS: ' + attemptsCounter, 300, 570);
  fill(0);
  textSize(50);
  text('PLAY AGAIN?', 300, 315);
}

function startPage(){
  background(0);
  fill(255)
  ellipse(300, 300, 400, 400);
  fill(0);
  textAlign(CENTER);
  textSize(50);
  text('START GAME', 300, 315);
  speedIncrease = 0;
  levelNumber = 1;
}

function resetLevel (){
  r = 0;
  g = 0;
  b = 0;
  
  do {
    if (frac<4){
      randomR = int(random(frac-2, frac));
      randomG = int(random(frac-2, frac));
      randomB = int(random(frac-2, frac));
    }
    else {
      randomR = int(random(frac-3, frac));
      randomG = int(random(frac-3, frac));
      randomB = int(random(frac-3, frac));}
  } while (randomR === 0 && randomG === 0 && randomB === 0);
  
  levelR = round(randomR*(255/frac));
  levelG = round(randomG*(255/frac));
  levelB = round(randomB*(255/frac));
  print('R' + levelR);
  print('G' + levelG);
  print('B' + levelB);

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
    text('R = ' + randomR + ', G = ' + randomG + ', B = ' + randomB, 300, 300);
   
    for (let i = 0; i < reds.length; i++) {
	reds[i].display();
	reds[i].drop(random(0.5+speedIncrease, 3+speedIncrease));
	greens[i].display();
	greens[i].drop(random(0.5+speedIncrease, 3+speedIncrease));
	blues[i].display();
	blues[i].drop(random(0.5+speedIncrease, 3+speedIncrease));
    }

  	if(round(r) == round(levelR) && round(g) == round(levelG) && round(b) == round(levelB)){
      if (levelNumber == 6) {
        attemptsCounter += attempts;
      }
	  nextLevelScreen = true;
      newLevel = false;
	}
  
    if(round(r) > round(levelR) || round(g) > round(levelG) || round(b) > round(levelB)){
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
    ellipse(300, 300, 380, 380);
    fill(r, g, b);
    textSize(45);
    text('NEXT LEVEL', 300, 310);
    fill(255);
    textSize(25);
    text('LEVEL ' + levelNumber + ' COMPLETE', 300, 70);
    text('ATTEMPTS: ' + attempts, 300, 570);
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
      attemptsCounter += attempts;
      attempts = 1;
      levelNumber = levelNumber+1;
      frac+= 1;
      speedIncrease += 1;
    }
  }
  if(finishSet){
    if (dist(mouseX, mouseY, 300, 300) < 200) {
      attemptsCounter = 0;
      startSet = true;
      levelNumber = 1;
      frac = 2;
      speedIncrease = 0;
      levelSet = false;
      newLevel = false;
      finishSet = false;
    }
  }
}