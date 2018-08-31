import PlayerModel from '../src/models/PlayerModel.js';
//import Player from '../src/models/Player.js';

describe("Player", function() {
  // let chai = require("chai");
	// let sinon = require("sinon");

	let assert = chai.assert;
	let expect = chai.expect;
	//let game = sinon.stub();


	 it("Can be created", function () {
     let player = new PlayerModel();
       assert.isOk(true);
    });

    it('increases player health', function() {
      let player = new PlayerModel(10);
      player.addHealth(5);
      assert.equal(player.health, 15);
    });

		it('shoud decrease player health', function () {
			let player = new PlayerModel(10);
			player.deductHealth(5);
			assert.equal(player.health, 5);
		});

		it('should increase player speed', function() {
			let player = new PlayerModel(10);
			player.increaseSpeed(5);
			assert.equal(player.speed, 10);
		});

		it('should decrease player speed', function() {
			let player = new PlayerModel(10);
			player.decreaseSpeed(1);
			assert.equal(player.speed, 4);
		});

		it('should kill the player', function (){
			let player = new PlayerModel(10);
			player.autoKill();
			assert.equal(player.isAlive, false);
		});
		it('should bring the player back alive', function(){
			let player = new PlayerModel(10);
			player.autoKill();
			player.ressurect();
			assert.equal(player.isAlive, true);
		});
		it('should spawn the character alive', function(){
			let player = new PlayerModel(10);
			assert.equal(player.isAlive, true);
		});
    // 
    // it('should kill the player when health = 0', function(){
    //         let playerModel = new PlayerModel(10);
    //         playerModel.deductHealth(100);
    //         assert.equal(playerModel.isAlive, false);
    // });
    it('should increase damage', function(){
      let player = new PlayerModel(10);
      player.increaseDamage(5);
      assert.equal(player.damage, 15);
    });
    it('should decrease player damage', function() {
      let player = new PlayerModel(10);
      player.decreaseDamage(1);
      assert.equal(player.damage, 9);
    });
    it('should reset damage when taken below 0', function() {
      let player = new PlayerModel(10);
      player.decreaseDamage(100);
      assert.equal(player.damage, 10);
    });
});
