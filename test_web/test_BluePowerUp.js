import  PowerUpModel from '../src/models/powerups/PowerUpModel.js';
import PlayerModel from '../src/models/PlayerModel.js';
import BluePowerUpModel from '../src/models/powerups/BluePowerUpModel.js';
//import BluePowerUp and PlayerModel

describe("BluePowerUp", function() {
    // let chai = require("chai");
      // let sinon = require("sinon");
  
      let assert = chai.assert;
      let expect = chai.expect;

      it("Can be created", function () {
        let PowerUpModel = new PowerUpModel();
           assert.isOk(true);
       });
       it("Can be created", function () {
        let BluePowerUp = new BluePowerUpModel();
           assert.isOk(true);
       });
       it("Can be created", function () {
        let BluePowerUp = new BluePowerUp();
           assert.isOk(true);
       });   
       it("Can be created", function () {
        let RedPowerUp = new RedPowerUp();
           assert.isOk(true);
       });   
       it("Can be created", function () {
        let PurplePowerUp = new PurplePowerUp();
           assert.isOk(true);
       });   
       it("Can be created", function () {
        let GreenPowerUp = new GreenPowerUp();
           assert.isOk(true);
       });   
       it("Can be created", function () {
        let YellowPowerUp = new YellowPowerUp();
           assert.isOk(true);
       });   
       it("blue increases speed", function(){
           let PlayerModel = new PlayerModel();
            PlayerModel.increaseSpeed(5);
            assert.isEqual(PlayerModel.speed, 10);
       });
       it("Can red increase health", function(){
        let PlayerModel = new PlayerModel();
         PlayerModel.addHealth(5);
         assert.isEqual(PlayerModel.health, 105);
    });       
});