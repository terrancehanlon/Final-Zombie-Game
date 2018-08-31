export default class HealthBarModel{
    constructor(x, y){
     this.x = x;
     this.y = y;
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