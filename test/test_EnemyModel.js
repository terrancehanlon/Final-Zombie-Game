import EnemyModel from '../src/models/EnemyModel.js';
//import EnemyModel from '../src/models/EnemyModel.js';

describe("Enemy", function () {
    let chai = require("chai");
    let sinon = require("sinon");

    let assert = chai.assert;
    let expect = chai.expect;
    //let game = sinon.stub();


    it("Can be made", function () {
        let enemy = new EnemyModel(10);
    });

    it('increases enemy health', function () {
        let enemy = new EnemyModel(10);
        enemy.increaseHealth(5);
        assert.equal(enemy.health, 15);
    });

    it('decrease enemy health', function () {
        let enemy = new EnemyModel(10);
        enemy.deductEnemyHealth(5);
        assert.equal(enemy.health, 5);
    });

    it('increase enemy speed', function () {
        let enemy = new EnemyModel(6);
        enemy.increaseEnemySpeed(5);
        assert.equal(enemy.speed, 10);
    });

    it('decrease enemy speed', function () {
        let enemy = new EnemyModel(6);
        enemy.decreaseEnemySpeed(1);
        assert.equal(enemy.speed, 4);
    });

});
