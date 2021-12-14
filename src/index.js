import Phaser from "phaser";


const config = {
  // WebGL (Web graphics library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade',
    arcade: {
      // gravity: {
      //   y: 400
      // },
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

// loadinng assets, such as images, music, animations...
function preload() {
  // 'this' context -scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 200;
const PIPES_TO_RENDER = 10;

let bird = null;
let upperPipe = null;
let lowerPipe = null;
let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

const initialBirdPOsition = {x: config.width / 10, y: config.height / 2}
const flapVelocity = 250;

function create() {
  // 0,0 is the topleft of the screen
  // default origin point is 0.5 0.5 which is the middle
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(initialBirdPOsition.x, initialBirdPOsition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    pipeHorizontalDistance += 400;
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);    

    upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);

    upperPipe.body.velocity.x = -200;
    lowerPipe.body.velocity.x = -200;
  }
  
  
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}



function update() {

  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = initialBirdPOsition.x;
  bird.y = initialBirdPOsition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;;
}
new Phaser.Game(config);