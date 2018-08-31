import Bullet from '../models/Bullets.js';

export default class Weapon extends Phaser.Sprite{

  constructor(game, x, y, img, frame, bullets){
    super(game, x, y, img);
    this.bullets = this.game.add.group();
  }

  create(){
    for(let i = 0; i < 1000; i++){
      let bullet = new Bullet(this.game);
      this.bullets.add(bullet);
    }
  }
}
