import BossModel from '../src/models/BossModel.js';
//import Boss from '../src/models/BossModel.js';

describe("Boss", function () {
    // let chai = require("chai");
    // let sinon = require("sinon");

    let assert = chai.assert;
    let expect = chai.expect;
    //let game = sinon.stub();


    it("Can be made", function () {
        let boss = new BossModel(15);
        assert.isOk(true);
    });

    it('increases boss health', function () {
        let boss = new BossModel(15);
        boss.increaseBossHealth(5);
        assert.equal(boss.health, 20);
    });

    it('decrease boss health', function () {
        let boss = new BossModel(15);
        boss.decreaseBossHealth(5);
        assert.equal(boss.health, 10);
    });

    it('increase boss speed', function () {
        let boss = new BossModel(9);
        boss.increaseBossMovement(5);

        assert.equal(boss.speed, 14);
    });

    it('decrease boss speed', function () {
        let boss = new BossModel(9);
        boss.decreaseBossMovement(1);
        assert.equal(boss.speed, 8);
    });

});
