export default class GreenPowerUp extends Phaser.Sprite{

  constructor(game, x, y, img){
    super(game, x, y, img);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
  }


update(){
  this.x -= 3;
}
}
