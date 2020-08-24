import Canvas from "./canvas";
import Player from "./player";
import w from "./w";

export default class Entities {
  constructor() {
    this._canvas = new Canvas({bounds: w._viewport_bounds, el: 'entities'}); 
    this._ctx = this._canvas._ctx; 
    // this._canvas._ctx.fillStyle = "red";
    // this._canvas._ctx.fillRect(0, 0, ...this._canvas.dimensions());
    w.player     = new Player({
      buildIn: true,
      hitrad: 15,
      maxrad: 15,
    }); 
    w.player.moveTo(w._viewport_bounds.width / 2, w._viewport_bounds.height / 4);
    w.player.isDisabled = false;
    w.entities.push(w.player);
  }

  update() {
    this._ctx.clearRect(0, 0, w._viewport_bounds.width, w._viewport_bounds.height);
    this._ctx.save(); 

    w.entities = w.entities.sort((a,b) => a._type - b._type);


    this._remaining = []; 
    for(let i=0; i<w.entities.length; i++){
      let e = w.entities[i];
      if(!e.isDead) {
        e.update(this._ctx);
        e.debug(this._ctx);
        this._remaining.push(e); 
      }
    }
    w.entities = this._remaining;
    this._ctx.restore();
    
  }
}
