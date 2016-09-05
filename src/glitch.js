class Glitch {

  constructor() {
    this.x = Util.rand(1, 20) * 40;
    this.y = Util.rand(1, 20) * 40;
    this.r = 0;//radius
    this.g = 0.2;
    this.isDead=false;
    this.isHit = false;
  }

  update(p) {
    this.r += this.r > 10 ? -8 : 0.15;
 
    if ((!this.isHit) && (p.x < this.x + cell &&  p.x + cell > this.x &&  p.y < this.y + cell && cell + p.y > this.y)) {
        this._gen();
        let gi = setInterval(() => {
             setTimeout(() => { this._gen() }, Util.rand(250, 1000));
        }, 500);

        setTimeout(() => { 
          clearInterval(gi);
          this.isDead = true;
        }, 2000);

        this.isHit = true;
    }    
}
  

  _gen() {
    this.lines = [];

    let h = this.h;
    let w = this.w;
    let ln = Util.rand(1, 13);

    for (let i = 0; i < ln; i++) {

      let xv = Math.random() * w;
      let ln = {
        x: xv,
        y: Math.random() * h,
        spliceWidth: w - xv,
        spliceHeight: Util.rand(5, h / 3)
      }

      this.lines.push(ln);
    }
  }

  render(c) {

    this.w = c.canvas.width;
    this.h = c.canvas.height;

    if(this.isDead)
    {
      return;
    }

    c.save();
    c.translate(this.x + 20, this.y + 20);
  
 		c.lineWidth = 5;
 		c.beginPath();
    c.arc(0, 0, this.r, 0 * Math.PI, 2 * Math.PI, false);
    c.strokeStyle = "#6f6";
    c.stroke();
 

    c.restore();
  
      if (this.isHit && this.lines) {
        this.lines.forEach(function (ln) {
          c.globalAlpha = 0.7;
          c.drawImage(c.canvas, 0, ln.y, ln.spliceWidth, ln.spliceHeight, ln.x, ln.y, ln.spliceWidth, ln.spliceHeight);
          c.drawImage(c.canvas, ln.spliceWidth, ln.y, ln.x, ln.spliceHeight, 0, ln.y, ln.x, ln.spliceHeight);
        });
      }
    }
  }
 