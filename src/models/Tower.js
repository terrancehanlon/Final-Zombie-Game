export default class Game extends Phaser.Sprite {

  constructor(game, x, y, img, frame){
    super(game, x, y, img);
    this.health = 1000;
    this.startHealth = this.health;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);


    var style2 = { font: "30px Arial", fill: "#00FF00", align: "center"};
    this.text = this.game.add.text(this.x, this.y - 25, this.health, style2)
    this.text2 = this.game.add.text(this.x + 70, this.y - 25, "/"+this.startHealth, style2);
  }

  create(){
    console.log("Create tower");
    //this.game.add.sprite(this.x, this.y, 'tower');
  }

  ifDead(){
    return this.health <= 0;
  }

  deductHealth(val){ //removes health from entity
    if(val < 0){
      this.health += Math.abs(val);
      console.log('deducting health');
    }else{
      this.health -= val;
    }
  }

  setMaxHealth(val){
    this.startHealth += val;
  }

  heal(val){ //adds health to the entity
    this.health += val;
  }

  update(){
      //this.x += 2;
      this.text.setText(this.health);
      this.text2.setText("/"+this.startHealth);
  }
}
