import PowerUpModel from '../src/models/powerups/PowerUpModel.js';
import PlayerModel from '../src/models/PlayerModel.js';
import BluePowerUpModel from '../src/models/powerupmodels/BluePowerUpModel.js';
import GreenPowerUpModel from '../src/models/powerupmodels/BluePowerUpModel.js';
import RedPowerUpModel from '../src/models/powerupmodels/BluePowerUpModel.js';
import YellowPowerUpModel from '../src/models/powerupmodels/BluePowerUpModel.js';
import PurplePowerUpModel from '../src/models/powerupmodels/BluePowerUpModel.js';
//import BluePowerUp and PlayerModel

describe("Power Ups", function() {
    let chai = require("chai");
      let sinon = require("sinon");

      let assert = chai.assert;
      let expect = chai.expect;

      it("Can be created", function () {
        let powerUpModel = new PowerUpModel();
           assert.isOk(true);
       });
       it("Blue Can be created", function () {
        let BluePowerUp = new BluePowerUpModel();
           assert.isOk(true);
       });
       it("Green Can be created", function () {
        let greenPowerUp = new GreenPowerUpModel();
           assert.isOk(true);
       });
       it("Red Can be created", function () {
        let redPowerUp = new RedPowerUpModel();
           assert.isOk(true);
       });
       it("Purple Can be created", function () {
        let purplePowerUp = new PurplePowerUpModel();
           assert.isOk(true);
       });
       it("Yellow Can be created", function () {
        let yellowPowerUp = new YellowPowerUpModel();
           assert.isOk(true);
       });
       it("blue increases speed", function(){
           let playerModel = new PlayerModel(5);
            playerModel.increaseSpeed(5);
            assert.equal(playerModel.speed, 10);
       });
       it("Can red increase health", function(){
        let playerModel = new PlayerModel(100);
         playerModel.addHealth(5);
         assert.equal(playerModel.health, 105);
    });

});
