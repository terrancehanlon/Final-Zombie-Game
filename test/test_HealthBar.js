import HealthBarModel from '../src/models/HealthBarModel.js';


describe("Health Bar", function () {
  let chai = require("chai");
  let sinon = require("sinon");
    let assert = chai.assert;
    let expect = chai.expect;

    it("Can be created", function () {
        let healthbar = new HealthBarModel(100,100);
           assert.isOk(true);
       });
    it("Can be lowered", function(){
        let healthbar = new HealthBarModel(100,100);
        healthbar.moveBar_x_negative(10);
        assert.equal(healthbar.x, healthbar.x);
    });
    it("Can be raised", function(){
        let healthbar = new HealthBarModel(100,100);
        healthbar.moveBar_x_positive(10);
        assert.equal(healthbar.x, healthbar.x);
    });
    it("Can be y lowered", function(){
        let healthbar = new HealthBarModel(100,100);
        healthbar.moveBar_y_negative(10);
        assert.equal(healthbar.y, healthbar.y);
    });
    it("Can be y lowered", function(){
        let healthbar = new HealthBarModel(100,100);
        healthbar.moveBar_y_positive(10);
        assert.equal(healthbar.y, healthbar.y);
    });
    it("Can x be got", function(){
        let healthbar = new HealthBarModel(100,100);
        assert.equal(healthbar.x, 100);
    });
    it("Can y be got", function(){
        let healthbar = new HealthBarModel(100,100);
        assert.equal(healthbar.x, 100);
    });
    });
