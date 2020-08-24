
const canvas      = document.createElement('canvas');
const ctx         = canvas.getContext("2d");

document.body.append(canvas); 

const result      = document.createElement('canvas');
const result_ctx  = result.getContext("2d");

document.body.append(result); 


function loadImg(src) {
  return new Promise((res, err) => {
    const image = new Image();
    if(image.complete) {res}; 
    image.addEventListener("load", res);
    image.addEventListener("error", err);
    image.src = src; 
  });
}
  
function rgb2hex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

function getXYfromIndex(i, width) {
  return [(i / 4) % width, Math.floor((i / 4) / width)]
}

export function pixelArtToCanvas(src) {
  loadImg(src).then(e => {
    const img     = e.target;
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    result.width  = img.naturalWidth;
    result.height = img.naturalHeight;
    ctx.imageSmoothingEnabled = false;

    
    ctx.fillStyle   = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const img_data  = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels    = img_data.data; 
    let colors      = {}; 
    var red, green, blue, alpha, hex; 

    for (var i = 0; i < pixels.length; i += 4) {
      red   = pixels[i];
      green = pixels[i+1];
      blue  = pixels[i+2];
      alpha = pixels[i+3];
      hex = rgb2hex(red,green,blue);
      if(typeof colors[hex] !== 'undefined') {
        colors[hex].push(i / 4);
      } else {
        colors[hex] = [i / 4];
      }
    }
    console.log(JSON.stringify(colors));

    for(let color in colors) {
      result_ctx.fillStyle = color;
      colors[color].forEach((pixel_index) => {
        result_ctx.fillRect(...getXYfromIndex(pixel_index * 4, canvas.width), 1, 1);
      })
    }
  })  
}