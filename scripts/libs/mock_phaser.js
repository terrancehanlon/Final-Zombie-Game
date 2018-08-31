(function () {
    var root = this;
    var Phaser = Phaser || function () { };    // jshint ignore:line

    //Stubbing Phaser methods
    // There's almost certainly a more elegant way to do this
    // I'd look at things like rewire or proxyquire if I had more time

    Phaser.Physics = sinon.stub();

    Phaser.Sprite = class {
    }; //To fix prototypal inheritance in Player

    Phaser.Sprite.prototype.body = sinon.stub();
    Phaser.Sprite.prototype.body.velocity =
        {x: 0, y: 0}; // So we can see the changed velocity value
    Phaser.Sprite.prototype.body.drag = sinon.stub();
    Phaser.Sprite.prototype.animations = sinon.stub();
    Phaser.Sprite.prototype.animations.play = sinon.spy();
    Phaser.Sprite.prototype.game = sinon.stub();
    Phaser.Sprite.prototype.game.input = sinon.stub();
    Phaser.Sprite.prototype.game.input.keyboard = sinon.stub();
    

    //Can modify and set these values to fake a key press
    let cursors = Phaser.Sprite.prototype.game.input.keyboard.createCursorKeys = sinon.stub();
    cursors.returns(
        {
            left: {isUp: false, isDown: false},
            right: {isUp: false, isDown: false},
            up: {isUp: false, isDown: false},
            down: {isUp: false, isDown: false},
        });

    //Can modify and set these values to fake a key press
    let key = Phaser.Sprite.prototype.game.input.keyboard.addKey = sinon.stub();
    key.returns(
        {
            isUp: false,
            isDown: false
        }
    );

    Phaser.Keyboard = sinon.stub();

    let add = Phaser.Sprite.prototype.animations.add = sinon.stub();
    add.returns({
        "onComplete":
            {add: sinon.stub()}
    });


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Phaser;
        }
        exports.Phaser = Phaser;
    } else if (typeof define !== 'undefined' && define.amd) {
        define('Phaser', (function () {
            return root.Phaser = Phaser;
        })());
    } else {
        root.Phaser = Phaser;
    }

    return Phaser;
}).call(this);

//After creating the Phaser mock object, attach it to the window so future methods can use it.
sinon.stub(window, 'Phaser');
