import w from './w'; 
import keys from './keys'; 
import types from './types'; 
import levels from './levels';
import Explosion from './explosion';
import Enemy from "./enemy";
import Wave from "./wave";
import UIController from './ui'; 
import CanvasController from "./canvas";
import Tilemap from "./tilemap"; 
import World from "./world"; 
import Camera from "./camera"; 
import Entities from "./entities";


export default class {
  constructor() {
    w.queueOnLoad.push(_ => {

      // 
      this._viewport        = document.getElementById('viewport');
      const rect            = this._viewport.getBoundingClientRect();
      w._viewport_bounds    = {top: rect.top, left: rect.left, width: rect.width, height: rect.height};
      w._viewport_bounds.getCenter = _ => {
        return {x: w._viewport_bounds.width / 2, y: w._viewport_bounds.height / 2}
      } 
      w._viewport_bounds.ranPos = _ => {
        return {x: 50 + w.ran(w._viewport_bounds.width - 100), y: 50 + w.ran(w._viewport_bounds.height - 100), angle: 0};
      } 

      // 
      w.cursor    = {x: w._viewport_bounds.width / 2, y: w._viewport_bounds.height / 2}
      document.addEventListener('mousemove', e => {
        w.cursor.x = e.clientX - w._viewport_bounds.left;
        w.cursor.y = e.clientY - w._viewport_bounds.top;
      });
      
      this._world           = new World(); 
      this._camera          = new Camera(); 
      this._entities        = new Entities(); 

      // Player
      this._camera.target = w.player;

      // this._world_canvas.ctx.fillRect(0, 0, this._world_canvas.canvas.width,  this._world_canvas.canvas.height)
      // viewport.append([this._world_canvas.canvas, this._entity_canvas.canvas, this._shadow_canvas.canvas, this._camera_canvas.canvas]);


      // Canvas
      // this._cc        = CanvasController; 
      // this._canvas    = this._cc.canvas; 
      // this._ctx       = this._cc.ctx;
      // this._wave      = new Wave(this._ctx);

      // UI
      // this._ui        = UIController; 

      // Restart Buttons
      this._restartBs = document.getElementsByClassName('b-restart');
      for(let i = 0; i < this._restartBs.length; i++) {
        this._restartBs[i].addEventListener('click', _ => this._restart());
      }

      this._score     = 0;
      this._backAlpha = 0.2 // Transparency of back button

      // Active Sequences
      this.activeSequences = [];

      // Initialize Game State;
      this._introSeq      = false; 
      this._state         = 'INTRODUCTION'; 
      this._level         = 0; 
      this._levels        = levels;
      w._level            = this._level;
      w._levels           = levels; 

      // Back Button
      this._backPos = {x: 25, y: 20}

      // Track Entities
      this._remaining = w.entities; 

      // Loop
      this._prevtime = Date.now(); 
      this._framerate = 10; 

      // START LOOP
      this.stateLoop(); 
    });
  }

  _resize() {
    w._viewport_bounds    = this._viewport.getBoundingClientRect();
    // this.canvas.width     = w._viewport_bounds.width * dpr;
    // this.canvas.height    = w._viewport_bounds.height * dpr;

    // // Globally set bounds
    w._viewport_bounds = {top: 0, left: 0, width: w._viewport_bounds.width, height: w._viewport_bounds.height};
    w._viewport_bounds.getCenter = _ => {
      return {x: w._viewport_bounds.width / 2, y: w._viewport_bounds.height / 2}
    } 
    w._viewport_bounds.ranPos = _ => {
      return {x: 50 + w.ran(w._viewport_bounds.width - 100), y: 50 + w.ran(w._viewport_bounds.height - 100), angle: 0};
    } 
    w._viewport_bounds.spawnPoints = []
  }

  _restart() {
    this._level = 0; 
    this._state = 'START_LEVEL';
    w._entities = [];
    w.player.reset();
    this.stateLoop(); 
  }

  _startLevel(i) {
    // w.entities  = []; 
    w._level    = i; 
    let level   = this._levels[i];
    
    // Add player
    // w.player.reset();
    w.player.moveTo(w._viewport_bounds.getCenter());
    w.player.isDisabled = false;
    // w.entities.push(player);
    
    // // Add enemies
    // this._spawned = 0;
    // this._tospawn = 0; 
    // let z         = 0;
    // Object.keys(level.enemies).map(eType => {
    //   let j      = w.ranInt(4);
    //   let eCount = level.enemies[eType]; 
    //   z++;
    //   for(let i=0; i < eCount; i++) {
    //     this._tospawn++ 
    //     setTimeout(_ => {
    //       let ranPos  = w._viewport_bounds.ranPos(); 
    //       let k       = 0; 
    //       while(w.sqDist(w._viewport_bounds.getCenter(), ranPos) < w.sq(200) && k < 20) {
    //         ranPos = {x: w.ran(w._viewport_bounds.width), y: w.ran(w._viewport_bounds.height), angle: 0};
    //         k++;
    //       }
    //       let e = new Enemy({
    //         pos: ranPos,
    //         spawn: (i + j) % 4, 
    //         subType: eType, 
    //         buildIn: true,
    //         // buildSpeed: 20,
    //       });
    //       while(w.sqDist(w._viewport_bounds.getCenter(), w._viewport_bounds.spawnPoints[(i + j) % 4]) < w.sq(200) && k < 20) {
    //         e._pos = {x: w.ran(w._viewport_bounds.width), y: w.ran(w._viewport_bounds.height), angle: 0};
    //         k++;
    //       }
    //       w.entities.push(e);
    //       this._spawned++; 
    //     }, 700 * i + Math.abs((5 - z) * 1500));      
    //   }
    // });
  }

  stateLoop() {
    // If its been enough time since previous frame--
    if((Date.now() - this._prevtime) > this._framerate) {
      this._prevtime  = Date.now(); 
      // this._ui.setState(this._state);
    //   paused = !debug && !document.hasFocus()
    // if (paused)
    // {
    //     // prevent stuck input if focus is lost
    //     mouseIsDown = mouseWasDown = 0;
    //     keyInputData.map(k=>k.wasDown=k.isDown=0);
    // }

      // Change state
      switch(this._state) {

        case 'INTRODUCTION':
          if(!this._hasIntrod) {
            this._hasIntrod = true; 
            this._startIntroTick = w.tick;
            this._introState = 0; 
            // w.player.moveTo(w._viewport_bounds.getCenter());
            // w.player.isDisabled = true; 
            // w.entities.push(w.player);
          }
          let lapsed = w.tick - this._startIntroTick;
          // if(lapsed > 0 && this._introState == 0) {
          //   this._introState++; 
          //   this._ui.createDialog({
          //     num: 1,
          //     main: '', 
          //     sub: '',
          //     classes: ['top-center', 'small', 'wide', 't-left'],
          //     pos: [400, 10] 
          //   });
          //   this._ui.typeOut(document.getElementById('main-1'), 'You were a shapeshifter...');
          // }
          // if(lapsed > 100 && this._introState == 1) {
          //   this._introState++; 
          //   this._ui.createDialog({
          //     num: 2,
          //     main: '', 
          //     sub: '',
          //     classes: ['top-center', 'small', 'wide', 't-left'],
          //     pos: [500, 100]
          //   });
          //   this._ui.typeOut(document.getElementById('main-2'), 'But you were CURSED, forced to occupy a single form.');
          // }
          // if(lapsed > 350 && this._introState == 2) {
          //   this._introState++; 
          //   this._ui.createDialog({
          //     num: 3,
          //     main: '', 
          //     sub: '',
          //     classes: ['top-center', 'small', 'wide', 't-left'],
          //     pos:[150, 350]
          //   });
          //   this._ui.typeOut(document.getElementById('main-3'), 'You were cast forward into the depths of the browser.');
          // }
          // if(lapsed > 600 && this._introState == 3) {
          //   this._introState++; 
          //   this._ui.createDialog({
          //     num: 4,
          //     main: '', 
          //     sub: '',
          //     classes: ['top-center', 'small', 'wide', 't-left'],
          //     pos: [200, 280]
          //   });
          //   this._ui.typeOut(document.getElementById('main-4'), 'Fight your way back . . . . .');
          // }
          if(lapsed > 0) {
            // w.player.setType('cPointer');
            this._state = 'START_LEVEL';
          };
          this._play();
          break; 

        case 'START_CHOOSE_UPGRADES':
          let level = w._levels[w._level];
          this._ui.showUpgrades({
            levelNum: w._level,
            level: level, 
            hasUpgrades: level.hasUpgrades,
            click1: _ => {
              // w.player.setType(level.up1)
              this._state = 'START_LEVEL';
            },
            click2: _ => {
              // w.player.setType(level.up2)
              this._state = 'START_LEVEL';
            },
          }); 
          if(!w._levels[w._level].hasUpgrades) {
            setTimeout(_ => {
              // this._ui.clearDialogs();
              this._state = 'START_LEVEL';
            }, 5000);
          }
          this._state = 'WAIT_CHOOSE_UPGRADES';
          break; 

        case 'WAIT_CHOOSE_UPGRADES':
          this._play();
          break;

        case 'START_LEVEL':
          this._backAlpha = 0.2;
          this._startLevel(this._level);
          this._state = 'PLAYING';
          break;

        case 'LEVEL_CLEAR':
          if(this._level + 1 < this._levels.length) {
            this._level++;
            w._level = this._level;
            w.player._health = 3;
            // this._ui.setHealth(3);
            this._state = 'WAIT_CHOOSE_BACK';
            // w.entities.push(new Explosion({pos: this._backPos}));
            // w.entities.map(e => {
            //   if(e._type === types['projectile']) {
            //     e._die(); 
            //   }
            // })
          } else {
            this._state = 'START_WIN';
          }
          break; 

        case 'WAIT_CHOOSE_BACK':
          if(w.player.collides(this._backPos, 50)) {
            w.entities.push(new Explosion({
              pos: this._backPos, 
              fill: '#111', 
              maxrad: 100000, 
              buildSpeed: 5
            }))
            this._state     = 'START_CHOOSE_UPGRADES';
          }
          this._play();
          // this._cc.drawBackButton(1, w.tick); 
          break; 

        case 'START_WIN':
          // this._ui.setFinalScore(this._score);
          this._state = 'WAIT_WIN';
          break; 

        case 'WAIT_WIN':
          this._play();
          break; 

        case 'DEAD':
          // this._ui.setFinalScore(this._score);
          this._play();
          break; 
        
        case 'PLAYING':
          this._score++; 
          
          if(w.player.isDead) {
            this._state = 'DEAD'; 
            break;
          }
          if((
            this._tospawn === this._spawned) && 
            w.entities.filter(e => e._type === types['enemy']).length === 0
          ) {
            this._state = 'LEVEL_CLEAR'; 
            break;  
          }
          this._play();
          break; 

        default: 
          this._play();
          break;
      }
      w.tick++; 
      // this._ui.setScore(this._score);
    }
    requestAnimationFrame(_ => this.stateLoop());
  }


  _play() {
      this._entities.update();
      this._camera.update();
      // this._cc.ctx.save();

      // this.Camera        
      // this._cc.moveTo(w.player._p.x, w.player._p.y);
      // // console.log(w.player._p.x, w.player._p.y);
      // this._cc.ctx.strokeRect(0, 0, w._viewport_bounds.width, w._viewport_bounds.height);
      // this._cc.ctx.beginPath();
      // this._cc.clear(); 
      // this._cc.drawBackground(); 
      // this._wave.draw(this._ctx); 
      
  }
}
