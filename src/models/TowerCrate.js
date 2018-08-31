export default class TowerCrate extends Phaser.Sprite{

  constructor(game, x, y, img, amount, pickedUp){
    super(game, x, y, img);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.amount = amount;
    this.pickedUp = pickedUp;
    this.speed = 9;
  }

  create(){

  }

  isPickedUp(speed){
    this.pickedUp = true;
    console.log('picked up');
    this.speed = speed;
  }

  followPlayer(x, y){

  }

  update(){
    // if(!this.pickedUp){
    //     this.x -= this.speed;
    // }else{
    //   this.x -= this.speed;
    // }
    if(!this.pickedUp){
    this.x -= 3;
  }
  }
}
