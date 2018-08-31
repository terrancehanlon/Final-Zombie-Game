import Bullet from '../models/Bullets.js';
import HealhPot from '../models/HealthPot.js';

export default class Enemy extends Phaser.Sprite{

  constructor(game, x, y, img, frame, coming_from_left){
    super(game, x, y, img);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.health = 100;

    this.animations.add("zombies", [0, 1, 2, 4, 5, 6, 7]);
    this.animations.play('zombies',game.rnd.integerInRange(5, 10), true);
    this.scale.x = -1;
    this.speed = 5;

    this.coming_from_left = coming_from_left;

    if(this.coming_from_left){
      this.scale.x = 1;
    }
  }

  create(){
    console.log("Create Enemy");
  }

  setHealth(val){ //adds health to entity
    this.health += val;
  }

  deductHealth(val){ //removes health to entity
    this.health -= val;

    if(this.health <= 0){ //checks if entity has any health left
      this.kill();
    }
  }

  update(){
    if(this.coming_from_left){ //checks direction entity is moving
      this.x += 5;
    }else{
      //this.x -= this.speed;
    }
  }
}
