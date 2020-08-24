import Canvas from "./canvas";
import Entity from "./entity"; 
import w from "./w";

class Jump extends Entity {
  getType() {
    return "jump"; 
  }

  update() {};

  _draw(ctx) {
    const width = 30;
    const height = 40;
    ctx.fillRect(this._p.x - width/2, this._p.y - height/2, width, height); 
  }
}

export default class World {
  constructor() {
    this._bounds  = {...w._viewport_bounds}; 
    this._bounds.height *= 4;
    this._canvas  = new Canvas({bounds: this._bounds, el: 'world'}); 
    this._ctx     = this._canvas._ctx; 
    this._jumps   = []; 
    this._init = this._init.bind(this);
    this._init();
  }

  _init() {
    this._ctx.fillStyle = "#658eff";
    this._ctx.fillRect(0, 0, ...this._canvas.dimensions());

    for (let i = 0; i < 1; i++) {
      let jump = new Jump({pos: {x: this._bounds.width / 2, y: this._bounds.height / 6}, hitrad: 20});
      this._jumps.push(jump);
      w.entities.push(jump);
    }

    this._ctx.fillStyle = "brown";
    this._ctx.strokeStyle = "green";
    this._jumps.forEach(jump => {
      jump._draw(this._ctx);
      jump.debug(this._ctx);
    });
  }
}
