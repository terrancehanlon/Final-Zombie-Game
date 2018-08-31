import HealthPot from '../models/HealthPot.js';

export default class StartScreen extends Phaser.Group {

  create() {
    var style2 = { font: "60px Arial", fill: "#00FF00", align: "center"};
    this.text = this.game.add.text(window.innerWidth/2 - 600, window.innerHeight/2 - 150,
      'The Running DeaD\n(beta v1.0)\nProtect the tower at all costs!\nSpaceBar to start the game\n'
    + 'spacebar to shoot, collect the hearts to stay alive', style2);
    console.log("on start screen");
    this.blood = this.game.add.group();
  }

  update() {
    let ran = Math.random() * 1000;
    if(ran > 995){
      let blood = new HealthPot(this.game, Math.random() *window.innerWidth,-10, 'blood1',10,10, true, false);
      this.game.add.existing(blood);
    }

    if(ran > 550 && ran < 560){
      let blood = new HealthPot(this.game, Math.random() *window.innerWidth,-10, 'blood3',10,10, true, false);
      this.game.add.existing(blood);
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      //this.background.stop();
      this.game.state.start('game');      //this.game.state.start('game');
    }
  }
}
