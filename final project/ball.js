class ball{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display(r, g, b){
    fill(r, g, b);
    ellipse(this.x, this.y, this.size);
  }
}