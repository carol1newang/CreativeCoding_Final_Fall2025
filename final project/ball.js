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
    if(this.y < height - 30){
      this.y+=speed;
    }
    else if(this.x > mouseX-20 && this.x < mouseX+30){
      if(this.colorIsRed){
        r += 85;
        this.x=random(0, width);
        this.y=0;
      }
      else if(this.colorIsGreen){
        g += 85;
        this.x=random(0, width);
        this.y=0;
      }
      else if(this.colorIsBlue){
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

  change(){
    if (key == 'r'){
      this.r = lerp(this.r, 255, 0.333);
    }
    if (key == 'g'){
      this.g = lerp(this.g, 255, 0.333);
    }
    if (key == 'b'){
      this.b = lerp(this.b, 255, 0.333);
    }
  }
}