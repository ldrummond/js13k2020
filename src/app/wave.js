import drawTile from "./tilemap"; 
import w from "./w";

export default class Wave {
  constructor(ctx) {
    this._bounds = {...w._viewport_bounds};
    this._bounds.height = this._bounds.height / 2;
    this._bounds.top = this._bounds.height;
  }

  draw(ctx) {
    for(let c = 0; c < this._bounds.width / 16; c++) {
      for(let r = 0; r < this._bounds.height / 16; r++) {
        // drawTile(ctx, c * 16 + this._bounds.left, r * 16 + this._bounds.top, 0); 
      }
    }
  }
}