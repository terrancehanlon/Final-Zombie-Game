export default class HealthBar extends Phaser.Sprite{

  constructor(game, x, y, img, frame){
    super(game, x, y, img);
  }
  getY(){
    return this.y;
  }
  getX(){
    return this.x;
  }
  moveBar_x_positive(val){
    this.x += val;
  }

  moveBar_x_negative(val){
    this.x -= val;
  }

  moveBar_y_positive(val){
    this.y += val;
  }

  moveBar_y_negative(val){
    this.y -= val;
  }
}
