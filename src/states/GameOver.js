export default class GameOver {

  create() {
  	this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'gameOver');
    console.log("at game over screen");
    // this.inputEnabled = true;
    // this.game.input.onTap.add(this.onDown,this);
    var style = { font: "100px Arial", fill: "#FFFFFF", align: "center" };
    var style2 = { font: "100px Arial", fill: "#00FF00", align: "center" };
    var score = this.game.add.text(10,10,"GAME OVER",style2);
    var myText = this.game.add.text(window.innerWidth/2 - 100,window.innerHeight/2, "Press the Spacebar to Start the Game again", style);
    // score.anchor.set(0.5,0.5);
    // score.alpha = 1;
    // myText.anchor.set(0.5,0.5);
    // myText.alpha = 1;
    // var myText2 = this.game.add.text(0, 100, "Game Over", style);
    // myText2.anchor.set(0.5,0.5);
    // myText2.alpha = 1;
    // myText.x = score.x = (this.game.width)/2;
    // score.y = (this.game.height-myText.height)/2;
    // myText2.x = (this.game.width)/2;
  }

  update() {
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.game.state.start('boot');
    }
  }
}
