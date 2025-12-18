class ball{
  constructor(x, y, size, r, g, b){
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;

    if(this.r == 255){
      this.colorIsRed = true;
    }
    if(this.b == 255){
      this.colorIsBlue = true;
    }
    if(this.g == 255){
      this.colorIsGreen = true;
    }
  }

  display(){
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.size);
  }

  main(r, g, b){ // large color indicator for each level
    fill(r, g, b);
    ellipse(this.x, this.y, this.size);
  }

  drop(speed){
    this.speed = speed;
    if(this.y < height - 40){
      this.y+=this.speed;
    }
    else if(this.x > mouseX-45 && this.x < mouseX+45){
      // if bucket touches red, green, or blue droplet, increase bucket color, reset droplet positions, change counter, play sound
      if(this.colorIsRed){
        r += 255/frac;
        this.x=random(0, width);
        this.y=0;
        counterR-=1;
        if(r <= levelR+1){
          correct.play();
        }
        else{wrong.play()}
      }
      if(this.colorIsGreen){
        g += 255/frac;
        this.x=random(0, width);
        this.y=0;
        counterG-=1;
        if(g <= levelG+1){
          correct.play();
        }
        else{wrong.play()}
      }
      if(this.colorIsBlue){
        b += 255/frac;
        this.x=random(0, width);
        this.y=0;
        counterB-=1;
        if(b <= levelB+1){
          correct.play();
        }
        else{wrong.play()}
      }
      
    }
    else{
      this.x=random(0, width);
      this.y=0;
    }
  }
}