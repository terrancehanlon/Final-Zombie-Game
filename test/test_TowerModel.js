import TowerModel from '../src/models/TowerModel.js';



describe("Tower Model", function() {
  let chai = require("chai");
    let sinon = require("sinon");
  let assert = chai.assert;
  let expect = chai.expect;

  it("can be created", function() {
    let tower = new TowerModel(5);
    assert.isOk(true);
  });

  it('increases tower health', function(){
    let tower = new TowerModel(5);
    tower.increaseTowerHealth(5);
    assert.equal(tower.health, 10);
  });

  it('decreases tower health', function(){
    let tower = new TowerModel(5);
    tower.decreaseTowerHealth(5);
    assert.equal(tower.health, 0);
  });

});
