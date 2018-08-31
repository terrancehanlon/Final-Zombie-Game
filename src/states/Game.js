//require our other components
import Player from '../models/Player.js';
import Bullet from '../models/Bullets.js';
import Enemy from '../models/Enemy.js';
import Tower from '../models/Tower.js';
import HealthPot from '../models/HealthPot.js';
import TowerCrate from '../models/TowerCrate.js';
import BluePowerUp from '../models/powerups/BluePowerUp.js';
import GreenPowerUp from '../models/powerups/GreenPowerUp.js';
import RedPowerUp from '../models/powerups/RedPowerUp.js';
import YellowPowerUp from '../models/powerups/YellowPowerUp.js';

export default class Game extends Phaser.State {

  constructor() {
    super();
    console.log("game mode on");
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, window.innerWidth + 100, window.innerHeight - 25, 'bg');
    this.tower = new Tower(this.game, window.innerWidth / 2, window.innerHeight / 2 - 100, 'tower');
    this.tower2 = new Tower(this.game, window.innerWidth / 2, window.innerHeight/4 - 100, 'tower');
    this.tower3 = new Tower(this.game, window.innerWidth / 2, window.innerHeight - (window.innerHeight / 4) - 100, 'tower');

    let backgroundMusic = this.game.add.audio('music');
    backgroundMusic.play();

    this.player = new Player(this.game, 600, 100, 'player');
    this.game.add.existing(this.player);
    this.game.add.existing(this.tower);
    this.game.add.existing(this.tower2);
    this.game.add.existing(this.tower3);



    /*Styles -- Can be outsourced to constants ? */
    this.style = { font: "30px Arial", fill: "#FFFFFF", align: "center" };
    this.style2 = { font: "90px Arial", fill: "#1e47cc", align: "center" };
    this.style3 = { font: "150px Arial", fill: "#FFFFFF", align: "center" };


    /*  Groups */
    this.followingEnemy;
    this.grabbedCrate; //Crate object that player will bring to tower to heal
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.healthPots = this.add.group();
    this.towerCrates = this.add.group();
    this.enemiesChasingTowers = this.add.group();
    this.towers = this.add.group();

    this.towers.add(this.tower);
    this.towers.add(this.tower2);
    this.towers.add(this.tower3);

    /* Text */
    this.score = 0;
    this.text = this.game.add.text(10, 10, this.score, this.style2);
    let blue = this.game.add.sprite(window.innerWidth/2.35 /*+ (window.innerWidth/10)*/, 10, 'blue');
    let red = this.game.add.sprite(window.innerWidth/2.55 /* + (window.innerWidth/9)*/, 10, 'red');
    let green = this.game.add.sprite(window.innerWidth/2.75 /*+ (window.innerWidth/8)*/, 10, 'green');
    let purple = this.game.add.sprite(window.innerWidth/3 /*+ (window.innerWidth/7)*/, 10, 'purple');
    let yellow = this.game.add.sprite(window.innerWidth/3.3/*+ (window.innerWidth/6)*/, 10, 'yellow');
    blue.scale.setTo(2.5);
    red.scale.setTo(2.5);
    green.scale.setTo(2.5);
    purple.scale.setTo(2.5);
    yellow.scale.setTo(2.5);
    this.bossText;
    var text;

    /*** Pause menu ***/
    var pauseButton = this.game.add.sprite(window.innerWidth/2, 10, 'button_pause');
    pauseButton.scale.setTo(0.3);
    pauseButton.inputEnabled = true;

    pauseButton.events.onInputUp.add(function() {
      this.game.paused = true;
      var style = { fill: '#FFF' };
      text = this.game.add.text(window.innerWidth/2, window.innerHeight/2, "GAME PAUSED", style);
      text.anchor.set(0.5, 0.5);
      text.scale.setTo(3);
    }, this);
    this.game.input.onDown.add(function(){
      if (this.game.paused) {
        this.game.paused = false;
        text.destroy();
      }
    }, this);
    pauseButton.fixedToCamera = true;

    /** Power Ups**/
    this.bluePowerUp;
    this.blueActivated = false;
    this.redPowerUp;
    this.redActivated = false;
    this.yellowPowerUp;
    this.yellowActivated = false;
    this.purplePowerUp;
    this.purpleActivated = false;
    this.greenPowerUp;
    this.greenActivated = false;

    /**  Misc Boolean values **/
    this.enemySpawn = true;
    this.enemySpawnRate = 990;
    this.bossCount = 0;
    this.lastDamaged = 0;
    this.bossMode = false;
    this.pickedUpCrate = false;
    this.bossIsDead = true;
    this.enemiesChasingTowerOn = false;
    this.bossWave = 10;

    //console.log(this.tower.tint);

  }

  update() {
    let ran = Math.random() * 1000;
    let healthRan = Math.random() * 1000;
    let crateRan = Math.random() * 1000;


    window.onkeydown = function (event) { if (event.keyCode == 80) { game.paused = !game.paused; } }
    if (this.player.health <= 0) {
      this.game.state.start('gameOver');
    }


    /*When health of tower or player is zero, game over*/
    if(this.player.health <= 0 || this.tower.health <= 0)
      this.game.state.start('gameOver');


    /*  Spawning Enemies */
    if(ran > this.enemySpawnRate && this.enemySpawn){
      for(var i = 0; i < 1; i++){
        this.enemy = new Enemy(this.game, -25, Math.random() * window.innerHeight, 'zombies', 2, true);
        this.enemies.add(this.enemy);
      }
    }

    /*  Spawning Tower Creates */
    if(crateRan >= 999){
      let towerCrate = new TowerCrate(this.game, window.innerWidth+20, Math.random() * window.innerHeight, 'crate', 10, false);
      this.towerCrates.add(towerCrate);
    }

    /*  Spawning Health Pots */
    if(healthRan >= 999){
        let healthPot = new HealthPot(this.game, window.innerWidth+20, Math.random() * window.innerHeight, 'heart', 10, 5, false, false);

        this.healthPots.add(healthPot);
    }

    /***  BOSS EVENTS  ***/

    /*  Spawn boss text and remove enemies from screen */
    if((this.score % this.bossWave == 0 && this.score != 0) && !this.bossText){
      this.bossIsDead = false;
      this.bossText = this.game.add.text(-20, window.innerHeight/2, 'BOSS', this.style3);
      this.enemySpawn = false;
      this.killAllEnemies();
      if(this.score == this.bossWave){
        this.bluue = new BluePowerUp(this.game, window.innerWidth+20, 100, 'blue');
        this.physics.enable(this.bluue, Phaser.Physics.ARCADE);
        this.game.add.existing(this.bluue);
        this.blueActivated = true;
        this.enemySpawnRate -= 5;
      }
      if(this.score == (2 * this.bossWave)){
        this.green = new GreenPowerUp(this.game, window.innerWidth+20, 100, 'green');
        //let greenSmoke = this.add.sprite(this.player.x, this.player.y, 'greenSmoke');
        this.physics.enable(this.green, Phaser.Physics.ARCADE);
        this.game.add.existing(this.green)
        this.greenActivated = true;
        this.enemySpawnRate -= 5;
      }
      if(this.score == (3 * this.bossWave)){
        this.red = new RedPowerUp(this.game, window.innerWidth+20, 100, 'red');
        this.physics.enable(this.green, Phaser.Physics.ARCADE);
        this.game.add.existing(this.red);
        this.redActivated = true;
        this.enemySpawnRate -= 5;
      }
      if(this.score == (4 * this.bossWave)){
        this.yellow = new YellowPowerUp(this.game, window.innerWidth+20, 100, 'yellow');
        this.physics.enable(this.yellow, Phaser.Physics.ARCADE);
        this.game.add.existing(this.yellow);
        this.yellowActivated = true;
        this.enemySpawnRate -= 5;
      }
    }

    if(this.blueActivated){
      this.physics.arcade.moveToObject(this.bluue, this.player,1000);
      this.physics.arcade.overlap(this.player, this.bluue, this.activateBlue, null, this);
    //  console.log(this.activateBlue);
    }

    if(this.greenActivated){
      //console.log(this.activateGreen);
      this.physics.arcade.moveToObject(this.green, this.player, 1000);
      this.physics.arcade.overlap(this.player, this.green, this.activateGreen, null, this);
    }
    if(this.redActivated){
      this.physics.arcade.moveToObject(this.red, this.player, 1000);
      this.physics.arcade.overlap(this.player, this.red, this.activateRed, null, this);
    }
    if(this.yellowActivated){
      this.physics.arcade.moveToObject(this.yellow, this.player, 1000);
      this.physics.arcade.overlap(this.player, this.yellow, this.activateYellow, null, this);
    }

    /*if bossText does not equal null
      Move the boss text accross the screen
    */

    if(this.bossText){
      this.bossText.x += 50;
      this.bossText.angle += 1;
    }
    /*  If boss is not dead **/
    if(!this.bossIsDead){
    if( (this.bossText && (this.bossText.x > window.innerWidth + 100)) && !this.bossMode){
    this.followingEnemy = new Enemy(this.game, -150, 300, 'dragon', 2, true);

    this.followingEnemy.setHealth(100);
    this.followingEnemy.scale.setTo(1);
    this.game.add.existing(this.followingEnemy);
    this.bossMode = true;
    //this.bossText = null;
    }
  }

    if(this.bossMode){
    this.game.physics.arcade.moveToObject(this.followingEnemy, this.tower, 350);
    this.game.physics.arcade.overlap(this.followingEnemy, this.tower, this.bossDamageTower, null, this);
    this.game.physics.arcade.overlap(this.followingEnemy, this.player.bullets, this.attackBoss, null, this);

    }

    //console.log('outside ' + this.tower);
    //console.log(this.player);
    if(this.pickedUpCrate){
      //console.log('inside' + this.tower);
      this.game.physics.arcade.moveToObject(this.grabbedCrate, this.player, 350);
      this.game.physics.arcade.overlap(this.grabbedCrate, this.tower, this.healTower,null,this);
    }



    /* Collisions */
    this.game.physics.arcade.overlap(this.enemies, this.player, this.damagePlayer, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.player.bullets, this.enemykill, null, this);
    this.game.physics.arcade.collide(this.enemies, this.towers, this.damageTower, null, this);
    this.game.physics.arcade.overlap(this.towerCrates, this.player, this.pickUpCrate, null, this);
    this.game.physics.arcade.overlap(this.healthPots, this.player, this.healPlayer, null, this);

    if(this.pickedUpCrate){
      this.game.physics.arcade.moveToObject(this.grabbedCrate, this.player, 350);
      this.game.physics.arcade.overlap(this.grabbedCrate, this.towers, this.healTowerGame);
    }


    this.text.setText(this.score);
  }



    activateBlue(){
      let style = { font: "100px Arial", fill: "#FFFFFF"};
      //var style = { fill: '#FFF' };
      this.player.speed = 15;
      this.blueActivated = false;
      this.bluue.kill();
      let checkMark = this.game.add.text(window.innerWidth/2.35 + 5, 10, "X", style);
      console.log('activating blue');
    }

    activateGreen(){
      let style = { font: "100px Arial", fill: "#FFFFFF"};
      this.player.fireRate = 500;
      this.greenActivated = false;
      this.green.kill();
      let checkMark = this.game.add.text(window.innerWidth/2.75, 10, "X", style);
    }

    activateRed(){
      let style = { font: "100px Arial", fill: "#FFFFFF" };
      this.player.setHealth(100);
      this.player.heal(100);
      this.redActivated = false;
      this.red.kill();
      let checkMark = this.game.add.text(window.innerWidth/2.55, 10, "X", style);
    }
    activateYellow(){
      let style = { font: "100px Arial", fill: "#FFFFFF" };
      this.tower.setMaxHealth(1000);
      this.yellowActivated = false;
      this.yellow.kill();
      let checkMark = this.game.add.text(window.innerWidth/3.3, 10, "X", style);
    }

  killAllEnemies(){ //clears all enemies from the screen
    this.enemies.forEach(function(enemy){
      enemy.kill();
    });
  }



  attackBoss(boss, player) { //removes health from boss entity
    if (this.followingEnemy){
        boss.deductHealth(30);
    }

    this.player.currentBullet.kill();

    if (boss.health <= 0) {
      this.enemySpawn = true;
      this.bossMode = false;
      this.bossText = false;
      this.bossIsDead = false;
      this.score += 1;
      this.tower.tint = 16777215;
    }
  }

  enemykill(player, enemy) {
    player.kill();
    if(this.player.currentBulletIsSuper == false)
        this.player.currentBullet.kill();
    this.score += 1;
    let splat = new HealthPot(this.game, this.x, this.y, 'blood2', 0, false, true);
    let time = Date.now();
    let updateTime = time;
    while (updateTime - time > 1500) {
      updateTime = Date.now();
    }
    console.log("enemy kill");
  }


  damageTower(enemy, player){ //removes health from tower entity
    player.deductHealth(10);
    enemy.kill();
    console.log("damaging tower");
  }


  healTower(crate, tower){ //adds health to the tower entity
    tower.deductHealth(-10);
    this.grabbedCrate.kill();
  }

  bossDamageTower(boss) {
    this.tower.deductHealth(3);
    if(this.tower.tint == 0xff00ff)
        this.tower.tint = 16777215;
    else
        this.tower.tint = 0xff00ff;


    //console.log(this.tower);
  }

  damagePlayer() { //removes health from the player entity with damage cool down
    if ((Date.now() - this.lastDamaged) > 150) { //checks if damage cool down is complete
      this.player.deductHealth(5);
      this.lastDamaged = Date.now();
    }
    console.log("damage player");
  }

  healPlayer(pots, player) { //add health to player entity
    player.kill();
    this.player.heal(10);
    console.log("heal player");
  }

  pickUpCrate(player, crate){ //allows player to grab and carry crate entity
    crate.isPickedUp(this.player.speed);
    this.grabbedCrate = crate;
    this.pickedUpCrate = true;
  }
}
