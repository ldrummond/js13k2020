import w from "./w";

class Canvas {
  constructor(opts) {
    this._bounds    = opts.bounds;
    this._canvas    = document.getElementById(opts.el);
    this._scale();    
    this._listen(); 
  }

  _scale() {
    var dpr             = 1; //window.devicePixelRatio || 1;
    this._canvas.width  = this._bounds.width * dpr;
    this._canvas.height = this._bounds.height * dpr;
    this._ctx = this._canvas.getContext('2d');
    this._ctx.scale(dpr, dpr);
    this._ctx.imageSmoothingEnabled = false;
  }

  _listen() {
    
  }

  dimensions() {
    return [this._canvas.width, this._canvas.height];
  }

  clear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  moveTo(x, y) {
    this._ctx.translate(this._bounds.width / 2 - x, this._bounds.height / 2 - y);
  }

 
  drawDeathScreen() {
    // this.ctx.fillStyle = '#222';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
  // this.ctx.fillStyle = 'teal';
    // this.ctx.fillRect(0, w._viewport_bounds.height / 2, w._viewport_bounds.width, w._viewport_bounds.height);
    // this.ctx.fillRect(this._bounds.width - 50, 0, this._bounds.width, 50);
    // this.ctx.fillRect(100, 0, this._bounds.width - 150, 15);
    // this.ctx.fillRect(100, 35, this._bounds.width - 150, 15);

    // this.ctx.fillStyle = '#EEE';
    // this.ctx.fillRect(100, 15, this._bounds.width - 150, 20);
  }

  drawBackButton(a = 0.2, tick = 1) {
    // this.ctx.globalAlpha = a;
    // this.ctx.fillStyle = '#FFF';
    // this.ctx.fillRect(20, 15, 40, 20);
    // this.ctx.strokeStyle = tick ? `hsl(${tick % 255}, 100%, 40%)` : '#888';
    // this.ctx.strokeRect(20, 15, 40, 20);
    // this.ctx.strokeStyle = '#888';
    // this.ctx.beginPath();
    // this.ctx.moveTo(40, 20);
    // this.ctx.lineTo(35, 25);
    // this.ctx.lineTo(40, 30);
    // this.ctx.stroke(); 
    // this.ctx.globalAlpha = 1;
  }

  drawReticule() {
    let size = 15; 
    this.ctx.beginPath(); 
    this.ctx.moveTo(this.cursor.x - size / 2, this.cursor.y);
    this.ctx.lineTo(this.cursor.x + size / 2, this.cursor.y);
    this.ctx.stroke(); 
    this.ctx.beginPath();     
    this.ctx.moveTo(this.cursor.x, this.cursor.y - size / 2);
    this.ctx.lineTo(this.cursor.x, this.cursor.y + size / 2);
    this.ctx.stroke(); 
    this.ctx.strokeRect(w._viewport_bounds.left, w._viewport_bounds.top, w._viewport_bounds.width, w._viewport_bounds.height);
  }

  drawFlash() {
    // this.ctx.fillStyle = '#000';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawLoader() {
    // this.ctx.fillStyle = '#222';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _getBounds() {
    this._bounds  = this.canvas.getBoundingClientRect();
  }
}

export default Canvas;