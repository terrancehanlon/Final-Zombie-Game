export default class GameOver {

  create() {
  	this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'gameOver');
    console.log("at game over screen");
    var style = { font: "100px Arial", fill: "#FFFFFF", align: "center" };
    var style2 = { font: "100px Arial", fill: "#00FF00", align: "center" };
    this.game.add.text(10,10,"GAME OVER",style2);
    this.game.add.text(window.innerWidth/2 - 100,window.innerHeight/2, "Press the Spacebar to Start the Game again", style);
  }

  update() {
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.game.state.start('boot');
    }
  }
}
