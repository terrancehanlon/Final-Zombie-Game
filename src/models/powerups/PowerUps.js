import PowerUpModel from '../models/PowerUpModel.js';

export default class PowerUp extends Phaser.Sprite{
  constructor(game, x, y, img, frame, color){
    super(game, x, y, img);

    PowerUpModel powerUpModel = new PowerUpModel(color)
}
