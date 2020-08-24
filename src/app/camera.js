import Canvas from "./canvas";
import w from "./w";

export default class Camera {
  constructor() {
    this._canvas = new Canvas({bounds: w._viewport_bounds, el: 'camera'}); 
    this.target = undefined;
  }

  update() {
    if(!this.target) return; 
    this._canvas.moveTo(this.target._p.x, this.target._p.y);
  }
}