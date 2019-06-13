import Bullet from '../models/Bullets.js';
import HealthBar from '../models/Healthbar.js';
import PlayerModel from '../models/PlayerModel.js';

export default class Player extends Phaser.Sprite{

  constructor(game, x, y, img, frame){
    super(game, x, y, img);

    //this.animations.add("player", [0, 1, 2, 3, 4, 5, 6, 7]);
    this.animations.add("player", [0, 2,3,4,5,7, 8, 9, 10]);

    this.shootSound = this.game.add.audio('shootSound');

    this.animations.play('player',game.rnd.integerInRange(0, 9), true);
    this.speed =  5;
    this.playerModel = new PlayerModel(150);
    this.health = this.playerModel.health;
    this.startHealth = this.health;
    this.currentBullet;
    this.currentBulletIsSuper = false;
    this.bullets = this.game.add.group();
    this.health_bar = new HealthBar(this.game, this.x + 15, this.y - 90, 'healthbar');

    var style2 = { font: "30px Arial", fill: "#fcfdff", align: "center"};
    this.text = this.game.add.text(this.health_bar.x + 10, this.health_bar.y, this.health, style2)
    this.text2 = this.game.add.text(this.health_bar.x + 75, this.health_bar.y, "/"+this.startHealth, style2);

    this.fireRate = 1000;

    this.game.add.existing(this.health_bar);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.lastShot  =  Date.now() + - 1000;
    this.lastSuperShot = Date.now() + - 5000;
    this.down = false;
    this.anchor.setTo(0.5);
  }

  create(){
    console.log("create player");
  }

  isDead(){
    return this.health <= 0;
  }

  shoot(isSuper){ //fires a bullet in the direction the player is facing
    this.x_bullet = this.x;
    this.y_bullet = this.y;
    this.shootSound.play();

    if(this.scale.x == -1 && this.angle == 0){
      console.log("shooting to left");
      this.bullet = new Bullet(this.game,this.x_bullet - 135,this.y_bullet + 30, null, 'bullet', true, false ,false);
      this.game.physics.arcade.enable(this.bullet);
      this.bullet.shoot(isSuper);
      this.currentBullet = this.bullet;
      this.bullets.add(this.bullet);
    }else if(this.scale.x == 1 && this.angle == 0){
      console.log('shooting to right');
      this.bullet = new Bullet(this.game,this.x_bullet + 115,this.y_bullet + 35, null, 'bullet', false, false, false);
      this.game.physics.arcade.enable(this.bullet);
      this.bullet.shoot(isSuper);
      this.currentBullet = this.bullet;
      this.bullets.add(this.bullet);
    }else if(this.down){
      console.log("shooting down");
      this.bullet = new Bullet(this.game,this.x_bullet,this.y_bullet - 35, null,'bullet',false, false, true);
      this.game.physics.arcade.enable(this.bullet);
      this.bullet.shoot(isSuper);
      this.currentBullet = this.bullet;
      this.bullets.add(this.bullet);
    }else if(this.angle == -90){
      console.log("shooting up");
      this.bullet = new Bullet(this.game,this.x_bullet,this.y_bullet - 35,null, 'bullet', false, true, false);
      this.game.physics.arcade.enable(this.bullet);
      this.bullet.shoot(isSuper);
      this.currentBullet = this.bullet;
      this.bullets.add(this.bullet);
    }
  }

  deductHealth(value){ //removes health from entity
    this.health -= value;
    console.log(this.health);
  }
  setHealth(val){
    this.startHealth += val;
  }
  heal(val){ //adds health to entity
      if ((this.health + val) > this.startHealth) { //checks to see if player will go above full health
          this.health = this.startHealth;
      }else{
        this.health += val;
      }
  }

  update(){
     this.cursors = this.game.input.keyboard.createCursorKeys();
     this.text.setText(this.health);
     this.text2.setText("/"+this.startHealth);


    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (Date.now() - this.lastShot) > 1000){ //checks if player is firing
      this.shoot(false);
      this.lastShot = Date.now(); //starts fire cooldown
      this.currentBulletIsSuper = false;
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.ONE) && (Date.now() - this.lastSuperShot) > 5000){
      this.shoot(true);
      this.lastSuperShot = Date.now();
      this.currentBulletIsSuper = true;
    }

    if(this.x >= window.innerWidth){
      this.x -= this.speed;
      this.health_bar.moveBar_x_negative(this.speed);
      this.text.x -= this.speed;
      this.text2.x -= this.speed;
    }

    if(this. x <= 0){
      this.x += this.speed;
      this.health_bar.moveBar_x_positive(this.speed);
      this.text.x += this.speed;
      this.text2.x += this.speed;
    }

    if(this.y >= window.innerHeight){
      this.y -= this.speed;
      this.health_bar.moveBar_y_negative(this.speed);
      this.text.y -= this.speed;
      this.text2.y-= this.speed;
    }

    if(this.y <= 0){
      this.y += this.speed;
      this.health_bar.moveBar_y_positive(this.speed);
      this.text.y += this.speed;
      this.text2.y += this.speed;
    }

    /* players movements */
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      this.angle = 0;
      this.down = false;
      this.scale.x = -1;
      this.x -= this.speed;
      this.text.x -= this.speed;
      this.text2.x -= this.speed;
      this.health_bar.moveBar_x_negative(this.speed);
      console.log(this.angle);
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      this.angle = 0;
      this.down = false;
      this.scale.x = 1;
      this.x += this.speed;
      this.text.x += this.speed;
      this.text2.x += this.speed;
      this.health_bar.moveBar_x_positive(this.speed);
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
      this.down = false;
      this.y -= this.speed;
      if(this.scale.x = 1){
        this.angle = -90;
      }else{
        this.angle = 90;
      }

      this.text.y -= this.speed;
      this.text2.y -= this.speed;
      this.health_bar.moveBar_y_negative(this.speed);
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
      this.y += this.speed;
      this.down = true;
      if(this.scale.x = -1){
        this.angle = -90;
      }else{
        this.angle = 90;
      }
      this.text.y += this.speed;
      this.text2.y += this.speed;
      this.health_bar.moveBar_y_positive(this.speed);
    }
  }
}
