import TowerCrateModel from '../src/models/TowerCrateModel.js';

describe("Tower Crate", function() {
  // let chai = require("chai");
	// let sinon = require("sinon");

	let assert = chai.assert;
    let expect = chai.expect;
    it("can be created", function () {
        let towerCrate = new TowerCrateModel(100,100,100,9);
          assert.isOk(true);
       });
    it("Can x be got", function () {
        let towerCrate = new TowerCrateModel(100,100,100,9);
        assert.equal(towerCrate.x, towerCrate.x);
    });
    it("can y be got", function () {
        let towerCrate = new TowerCrateModel(100,100,100,9);
        assert.equal(towerCrate.y,towerCrate.y);
    });
    it("speed", function () {
        let towerCrate = new TowerCrateModel(100,100,100,9);
          assert.equal(towerCrate.speed, 9);
       });
     it("amount", function () {
        let towerCrate = new TowerCrateModel(100,100,100,9);
          assert.equal(towerCrate.amount, 100);
       });   
    
});