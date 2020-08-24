let w = window;

// w.DEBUG = true;  
w.entities = [];
w.tick = 0; 

// 
w.queueOnLoad = [];

// 
w.addEventListener('DOMContentLoaded', _ => {
  w.queueOnLoad.map(executable => {
    executable(); 
  });
});

// 
w.createCanvas = (bounds) => {
  var canvas         = document.createElement('canvas'); 
  var dpr            = 1;
  canvas.width       = bounds.width * dpr;
  canvas.height      = bounds.height * dpr;
  var ctx            = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;
  return {canvas, ctx}; 
}

// set in canvas
// w._viewport_bounds    = {};
// w._viewport_bounds.getCenter    = _ => {};
// w._viewport_bounds.ranPos       = _ => {};
// w._viewport_bounds.spawnPoints  = []

w.circ = (x, y, r, ctx) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// 
w.dToRad = deg => {
  return deg * Math.PI / 180;
}

// 
w.rToDeg = rad => {
  return rad * 180 / Math.PI;
}

// 
w.inAir = p => p.y < (w._viewport_bounds.height / 2); 

// 
w.sq = i => Math.pow(i,2)

// 
w.sqDist = (p1, p2) => {
  return w.sq(p1.x - p2.x) + w.sq(p1.y - p2.y)
}

// 
w.hyp = (p1, p2) => {
  return Math.sqrt(p1*p1+p2*p2)
}

// 
w.ran = (i = 1) => Math.random() * i; 

// 
w.ranRad = _ => Math.PI / 30 * Math.random();

// 
w.ranNorm = (i = 1) => (Math.random() - 0.5) * i;

// 
w.ranInt = i => Math.round(Math.random() * i);

// 
w.oneIn = i => Math.round(Math.random() * i) === i; 

// 
w.ranSeq = i => {
  let x = Math.sin(i * 100000);
  return x - Math.floor(x);
}

w.next = (arr, val) => {
  let id = arr.indexOf(val)
  if(id !== -1) {
    return id + 1 < arr.length ? arr[id+1] : arr[0];
  }
}

export default w; 