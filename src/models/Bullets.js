import Constant from '../states/constants.js';

export default class Bullet extends Phaser.Sprite{

  constructor(game, x, y, image, frame, goingToLeft, goingUp, goingDown){
    super(game, x, y, frame);
    this.shooting = false;
    this.bullets = this.game.add.group();
    this.bullet = this.game.add.sprite(this.x, this.y, image);
    this.goingToLeft = goingToLeft;
    this.goingUp = goingUp;
    this.goingDown = goingDown;
    this.isSuper = false;
  }

  create(){
  }

  shoot(isSuper){ //puts bullet into action
    this.shooting = true;
    this.isSuper = isSuper;
    if(isSuper)
      this.scale.setTo(10);
  }

  trackBullets(){
    return this.bullets.add(this.bullet);
  }

  enemykill(player, enemy){
    player.kill();
  }

  update(){
    let constant = new Constant();

    if(this.goingUp || this.goingDown){ //checks direction of bullet
      if(this.shooting && this.goingUp){
        this.y -= 15;

        if(this.y < -3500){ //checks for edge of screen to delete bullet
          this.kill();
          this.shooting = false;
        }
      }
      if(this.shooting && this.goingDown){
        this.y += 15;

        if(this.y > window.innerHeight + 3500){ //checks for edge of screen to delete bullet
          this.kill();
          this.shooting = false;
        }
      }
    }
    else{
      if(this.shooting && !this.goingToLeft){
        this.x += 15;

        if(this.x > (window.innerWidth + 3500)){ //checks for edge of screen to delete bullet
          this.shooting = false;
          this.kill();
        }
      }

      if(this.shooting && this.goingToLeft){
        this.x -= 15;

        if(this.x < -3500){ //checks for edge of screen to delete bullet
          this.shooting = false;
          this.kill();
        }
      }
    }
  }
}
