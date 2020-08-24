import tilemap from '../images/tilemap.png'

let image = new Image(); 
let loaded; 
let _tile_width   = 16;
let _tile_height  = 16;
let _tile_rows    = undefined;
let _tile_cols    = undefined;
image.src = tilemap;
if (image.complete) {
  loaded = true; 
} else {
  image.addEventListener("load", img => {
    loaded      = true;
    _tile_cols  = img.naturalWidth / _tile_width;
    _tile_rows  = img.naturalHeight / _tile_height;
  });
}

export default function drawTile(ctx, x, y, row, col, flip) {
  if(!loaded) return
  if(flip) {
    ctx.scale(-1, 1);
    ctx.drawImage(image, _tile_height * col, _tile_width * row, _tile_width, _tile_height, x - _tile_width, y - _tile_height, _tile_width * 2, _tile_height * 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.restore(); 
  } else {
    ctx.drawImage(image, _tile_height * col, _tile_width * row, _tile_width, _tile_height, x - _tile_width, y - _tile_height, _tile_width * 2, _tile_height * 2); 
  }
}

