import Weapon from '../src/models/WeaponModel';
import WeaponModel from '../src/models/WeaponModel';

describe("Weapon", function() {
  let chai = require("chai");
	let sinon = require("sinon");

	let assert = chai.assert;
    let expect = chai.expect;
    it("Can be made", function () {
        let weapon = new WeaponModel();
          assert.isOk(true);
       });



});
