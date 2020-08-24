import { getAngle } from './functions';
import w from './w'; 

export default class {
  constructor(opts = {}) {
    let t = this;
    t._parent      = opts.parent || 'game'; 
    t._type        = opts.type   || 'entity';

    t._speed       = opts.speed  || 1; 
    t._rotate      = opts.rotate || 0.01; 
    t._health      = opts.health || 1; 
    t._damage      = opts.damage || 1; 
    t._p           = {x: w._viewport_bounds.width / 2,  y: w._viewport_bounds.height / 2, angle: 0, z: 0, ...opts.pos};
    t._v           = {r: 0, m: 0, x: 0, y: 0, z: -0.1, ...opts.vel};
    // t._r           = opts.rotation || 0; 
    t._constAngle  = opts.constAngle;
    t._collides    = opts.collides || true; 
    
    t._buildIn     = opts.buildIn || false; 
    t._buildSpeed  = opts.buildSpeed || 1; 

    t._isBoxCollider = opts.isBoxCollider || false;
    t._hitrad      = t._buildIn ? 1 : opts.hitrad || 5;
    t._maxrad      = opts.maxrad || t._hitrad;

    t.isDead       = false; 
  }

  takeDamage(d) {
    this._health -= d; 
    if(this._health <= 0) {this._die();}
  }
  
  moveTo(pos) {
    this._p.x = pos.x;
    this._p.y = pos.y;
  }

  _checkCollisions() {
    let cols = w.entities.filter(e => w.sqDist(this._p, e._p) < w.sq(this._hitrad + e._hitrad) && e._collides && e !== this);
    this._handleCollisions(cols);
  }

  _handleCollisions(cols) {
    
  }

  getType() {
    return false; 
  }

  collides(p, prad) {
    return w.sqDist(this._p, p) < w.sq(this._hitrad * 0.6) + w.sq(prad * 0.6)
  }

  _checkBounds() {
    if(this._p.x - this._hitrad < 2)                          {return 1}           
    if(this._p.x + this._hitrad > w._viewport_bounds.width)   {return 2} 
    if(this._p.y - this._hitrad < 2)                          {return 3}             
    if(this._p.y + this._hitrad > w._viewport_bounds.height)  {return 4}
  }

  _die() {
    this.isDead = true; 
  }

  debug(ctx) {
    if(this._isBoxCollider) {
      ctx.strokeRect(this._p.x, this._p.y, this._hitrad, this._hitrad);
    } else {
      ctx.beginPath();
      ctx.arc(this._p.x, this._p.y, this._hitrad, 0, 2 * Math.PI);    
      ctx.stroke(); 
    }
  }

  inAir() {return this._p.z > 0}

  Destroy()               { gameObjects.splice(gameObjects.indexOf(this), 1); }


  _build() {
    if(this._hitrad < this._maxrad) {
      this._hitrad += this._buildSpeed;
    }
  }

  _bounce() {
    switch(this._checkBounds()) {
      case 1: this._v.r = Math.abs(this._v.r); return true;
      case 2: this._v.r = -Math.abs(this._v.r); return true;
      case 3: this._v.m = -Math.abs(this._v.m); return true;
      case 4: this._v.m = Math.abs(this._v.m); return true;
    }
  }

  _updatePos() {
    // this._p.y     -= this._v.m * this._speed;
    if(!this.inAir()) {
      this._p.angle = this._constAngle || this._target && getAngle(this._p, this._target); 
    }
    // console.log(this._p.angle);
    this._p.x     = this._p.x + (this._v.m * Math.cos(this._p.angle)) * this._speed;
    this._p.y     = this._p.y + (this._v.m * Math.sin(this._p.angle)) * this._speed;
    this._p.z     = this._p.z <= 0 ? 0 : this._p.z + (this._v.z);
    // this._p.z     = this._p.z + this._v.z * 0.01;
  }

  _updateVel() {
    if(!this.inAir()) {
      this._v.r *= this._v.r > 0.1 || this._v.r < 0.1 ? 0.95 : 0; 
      this._v.m *= this._v.m > 0.1 || this._v.m < 0.1 ? 0.95 : 0;
    }
    // this._v.z *= this._v.z > 0.1 || this._v.z < 0.1 ? 0.95 : 0;
    // this._v.y += 0.1; 
    
    // if(!w.inAir(this._p)) {
      // this._v.y *= this._v.y > 0.1 || this._v.y < 0.1 ? 0.95 : 0;
    //   this._v.y -= +0.2; 
    //   if(this._v.y < 0) this._v.y = 0;
    // }
  }
 
  update(ctx) {
    if(this._buildIn)     {this._build()}
    if(this.health <= 0)  {this._die()}
    if(this.collides)     {this._checkCollisions()}; 

    this._updatePos();
    this._updateVel(); 
    this._checkBounds(); 
    this._render(ctx); 
  }

  _draw(ctx) {
    ctx.fillRect(this._p.x, this._p.y, 20 * this._hitrad / this._maxrad, 20 * this._hitrad / this._maxrad);
  }

  _render(ctx) {
    ctx.save();
    ctx.translate(this._p.x, this._p.y); 
    ctx.rotate(this._p.angle);
    
    this._draw(ctx); 

    ctx.restore(); 
  }
}
