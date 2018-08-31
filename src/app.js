
import Constant from "./states/constants.js";
import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import StartScreen from "./states/StartScreen.js";
import GameOver from "./states/GameOver.js";

let constant = new Constant();
window.onload = function () {
    let game = new Phaser.Game(window.innerWidth + 100, window.innerHeight - 45, Phaser.CANVAS, "game");
    game.state.add('game', Game);
  //  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('startScreen', StartScreen);
    game.state.add('game', Game);
    game.state.add('gameOver', GameOver);
    game.state.start('boot');
};
