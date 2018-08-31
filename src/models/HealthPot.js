export default class HealthPot extends Phaser.Sprite{

  constructor(game, x, y, img, healthIncrease, moveSpeed, isBlood, stationaryBlood){
    super(game, x, y, img);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.value = healthIncrease;
    this.isBlood = isBlood;
    this.stationaryBlood = stationaryBlood;
    this.speed = moveSpeed;
  }

  create(){
  }

  update(){
    if(this.isBlood && !this.stationaryBlood){
      this.y += this.speed;
    }else if(!this.isBlood && !this.stationaryBlood){
      this.x-= this.speed;
    }
  }
}
