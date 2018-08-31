export default class PowerUpModel{
  /**
   * Power Up model
    red - increase total health
    blue - speed
    purple - damage
    green - bullet speed rate
    yellow - increase tower total health

    constructor will contain these color values, true determines thats the gem they are, false otherwise.
    PowerUpModel(red, blue, purple, green, yellow)
    Red power up = PowerUpModel(true, false, false, false, false)
    blue power up = PowerUpModel(false, true, false, false, false)
    etc..
   */

   PowerUpModel(color){
     this.color = color;
   }

   redPowerUp(){

   }
   bluePowerUp(){

   }
   purplePowerUp(){

   }
  greenPowerUp(){

  }
  yellowPowerUp(){

  }


}
