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
let hardLevel;

function preload(){
  correct = loadSound(correct.mp3);
  wrong = loadSound(wrong.mp3);
}

function setup(){
	createCanvas(600, 600);
	background(50, 50, 50);
	noStroke();

	mainBall = new ball(300, 300, 420);

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-400, -200);
		let s = 50;
		let r = 255;
		let g = 0;
		let b = 0;
		reds.push(new ball(x, y, s, r, g, b));
	}

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-400, -200);
		let s = 50;
		let r = 0;
		let g = 255;
		let b = 0;
		greens.push(new ball(x, y, s, r, g, b));

	}

	for(let i = 0; i < 2; i++){
		let x = random(0, width);
		let y = random(-400, -200);
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
  fill(255);
  ellipse(300, 300, 380, 380);
  textStyle(BOLD);
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
  textAlign(CENTER);
  fill(50, 255, 50);
  ellipse(170, 170, 280, 280);
  fill(255, 50, 50);
  ellipse(430, 430, 280, 280);
  fill(255);
  textSize(60);
  textFont('Helvetica Neue');
  textStyle(BOLD);
  text('COLOR CATCHER', 300, 320);
  fill(0);
  textSize(35);
  text('EASY MODE', 170, 180);
  text('HARD MODE', 430, 440);

  textStyle(NORMAL);
  textSize(15);
  if (dist(mouseX, mouseY, 170, 170) < 125) {
    text('SEE YOUR PROGRESS', 170, 205);
    text('IN REAL TIME', 170, 220);
  }
  if (dist(mouseX, mouseY, 430, 430) < 125) {
    text('MIX BY MEMORY &', 430, 465);
    text('COLOR THEORY', 430, 480);
  }
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
      
      counterR = randomR;
      counterG = randomG;
      counterB = randomB;
    }
    else {
      randomR = int(random(frac-3, frac));
      randomG = int(random(frac-3, frac));
      randomB = int(random(frac-3, frac));
    
      counterR = randomR;
      counterG = randomG;
      counterB = randomB;}
  } while (randomR === 0 && randomG === 0 && randomB === 0);
  
  levelR = round(randomR*(255/frac));
  levelG = round(randomG*(255/frac));
  levelB = round(randomB*(255/frac));

  for (let i = 0; i < reds.length; i++) {
    reds[i].x = random(0, width);
    reds[i].y = random(-400, -200);
    greens[i].x = random(0, width);
    greens[i].y = random(-400, -200);
    blues[i].x = random(0, width);
    blues[i].y = random(-400, -200);
  }
}

function level(){
	bucket();
	mainBall.main(levelR, levelG, levelB);
    fill(255);
    if(levelNumber == 1){
      textSize(28);
      textStyle(BOLD);
      text('CATCH THE DROPLETS', 300, 265);
      text('TO MATCH THIS COLOR!', 300, 300);
      fill(255);
      textAlign(CENTER);
      textSize(20);
      textStyle(NORMAL);
      if(hardLevel === false){
        text('R = ' + counterR + ', G = ' + counterG + ', B = ' + counterB, 300, 335);
      }
      else if(hardLevel === true){
        text('R = ' + randomR + ', G = ' + randomG + ', B = ' + randomB, 300, 335);
      }
    }
  else{
      fill(255);
      textSize(20);
      textStyle(NORMAL);
      if(hardLevel === false){
        text('R = ' + counterR + ', G = ' + counterG + ', B = ' + counterB, 300, 300);
      }
      else if(hardLevel === true){
        text('R = ' + randomR + ', G = ' + randomG + ', B = ' + randomB, 300, 300);
      }
    
  }
   
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
      
      counterR = randomR;
      counterG = randomG;
      counterB = randomB;
      
      for (let i = 0; i < reds.length; i++) {
        reds[i].x = random(0, width);
        reds[i].y = random(-300, -100);
        greens[i].x = random(0, width);
        greens[i].y = random(-300, -100);
        blues[i].x = random(0, width);
        blues[i].y = random(-300, -100);
      }
    }
}

function nextLevel(){
    textStyle(BOLD);
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
    if (dist(mouseX, mouseY, 170, 170) < 125) {
      startSet = false;
      levelSet = true;
      newLevel = true;
      hardLevel = false;
    }
    
    if (dist(mouseX, mouseY, 430, 430) < 125) {
      startSet = false;
      levelSet = true;
      newLevel = true;
      hardLevel = true;
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