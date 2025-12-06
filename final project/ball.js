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

  main(r, g, b){
    fill(r, g, b);
    ellipse(this.x, this.y, this.size);
  }

  drop(speed){
    this.speed = speed;
    if(this.y < height - 60){
      this.y+=this.speed;
    }
    else if(this.x > mouseX-40 && this.x < mouseX+40){
      if(this.colorIsRed){
        r += 85;
        this.x=random(0, width);
        this.y=0;
      }
      if(this.colorIsGreen){
        g += 85;
        this.x=random(0, width);
        this.y=0;
      }
      if(this.colorIsBlue){
        b += 85;
        this.x=random(0, width);
        this.y=0;
      }
    }
    else{
      this.x=random(0, width);
      this.y=0;
    }
  }
}