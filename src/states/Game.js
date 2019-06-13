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
    
    //adds background image
    this.add.tileSprite(0, 0, window.innerWidth + 100, window.innerHeight - 25, 'bg');

    this.turnOnBackgroundMusic();
    this.createTowers();
    this.createPlayer();


    this.styles = {
      smallText: { font: "30px Arial", fill: "#FFFFFF", align: "center" },
      medText: { font: "90px Arial", fill: "#1e47cc", align: "center" },
      LargeText: { font: "150px Arial", fill: "#FFFFFF", align: "center" },
      pausedMenuText: { fill: '#FFF' }
    }



    /*  Groups */
    this.followingEnemy;
    this.grabbedCrate;
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.healthPots = this.add.group();
    this.towerCrates = this.add.group();
    this.enemiesChasingTowers = this.add.group();
    this.towers = this.createTowerGroup();


    /* Text */
    this.score = 0;
    this.text = this.game.add.text(10, 10, this.score, this.styles['medText']);
    
    this.createPowerUpTextMenu();

    this.bossText;
    var text;

    /*** Pause menu ***/
    var pauseButton = this.game.add.sprite(window.innerWidth/2, 10, 'button_pause');
    pauseButton.scale.setTo(0.3);
    pauseButton.inputEnabled = true;

    pauseButton.events.onInputUp.add(function() {
      this.game.paused = true;
      text = this.game.add.text(window.innerWidth/2, window.innerHeight/2, "GAME PAUSED", this.styles['pausedMenuText']);
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

    
  }

  update() {
    let randomDiceRoll = Math.random() * 1000;
    let healthRandomDiceRoll = Math.random() * 1000;
    let crateRandomDiceRoll = Math.random() * 1000;


    window.onkeydown = function (event) { if (event.keyCode == 80) { 
      game.paused = !game.paused; 
    } 
  }

    /*When health of tower or player is zero, game over*/
    if(this.player.isDead() || this.tower.isDead() <= 0){
      this.gameOver();
    }
      

    /*  Spawning Enemies */
    if(randomDiceRoll > this.enemySpawnRate && this.enemySpawn){
      this.createEnemies();
    }

    /*  Spawning Tower Creates */
    if(crateRandomDiceRoll >= 999){
      this.createCrates();
    }

    /*  Spawning Health Pots */
    if(healthRandomDiceRoll >= 999){
      this.createHealthPot();
    }

    /***  BOSS EVENTS  ***/

    /*  Spawn boss text and remove enemies from screen */
    if(this.isBossRound()){
      this.bossIsDead = false;
      this.bossText = this.game.add.text(-20, window.innerHeight/2, 'BOSS', this.styles['LargeText']);
      this.enemySpawn = false;
      this.killAllEnemies();

      if(this.score == this.bossWave){
        this.prepareBlue();
      }
      if(this.score == (2 * this.bossWave)){
        this.prepareGreen();
      }
      if(this.score == (3 * this.bossWave)){
          this.prepareRed();
      }
      if(this.score == (4 * this.bossWave)){
          this.prepareYellow();
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
    this.boss = new Enemy(this.game, -150, 300, 'dragon', 2, true);

    this.boss.setHealth(100);
    this.boss.scale.setTo(1);
    this.game.add.existing(this.boss);
    this.bossMode = true;
    //this.bossText = null;
    }
  }

    if(this.bossMode){
    this.game.physics.arcade.moveToObject(this.boss, this.tower, 350);
    this.game.physics.arcade.overlap(this.boss, this.tower, this.bossDamageTower, null, this);
    this.game.physics.arcade.overlap(this.boss, this.player.bullets, this.attackBoss, null, this);

    }

    if(this.pickedUpCrate){
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

  createPowerUpTextMenu(){
    let powerUps = {
      blue: this.game.add.sprite(window.innerWidth/2.35, 10, 'blue'),
      red: this.game.add.sprite(window.innerWidth/2.55, 10, 'red'),
      green: this.game.add.sprite(window.innerWidth/2.75, 10, 'green'),
      purple: this.game.add.sprite(window.innerWidth/3, 10, 'purple'),
      yellow: this.game.add.sprite(window.innerWidth/3.3, 10, 'yellow')
    }

    powerUps['blue'].scale.setTo(2.5);
    powerUps['red'].scale.setTo(2.5);
    powerUps['green'].scale.setTo(2.5);
    powerUps['purple'].scale.setTo(2.5);
    powerUps['yellow'].scale.setTo(2.5);
    

  }

  turnOnBackgroundMusic(){
    let backgroundMusic = this.game.add.audio('music');
    backgroundMusic.play();
  }

  createTowers(){
    this.tower = new Tower(this.game, window.innerWidth / 2, window.innerHeight / 2 - 100, 'tower');
    this.tower2 = new Tower(this.game, window.innerWidth / 2, window.innerHeight/4 - 100, 'tower');
    this.tower3 = new Tower(this.game, window.innerWidth / 2, window.innerHeight - (window.innerHeight / 4) - 100, 'tower');
    this.game.add.existing(this.tower);
    this.game.add.existing(this.tower2);
    this.game.add.existing(this.tower3);
  }

  //Creates and returns phaser group object, can add parameter to include N number of towers.
  createTowerGroup(){
    this.towers = this.add.group();

    this.towers.add(this.tower);
    this.towers.add(this.tower2);
    this.towers.add(this.tower3);

    return this.towers;
  }

  createPlayer(){
    this.player = new Player(this.game, 600, 100, 'player');
    this.game.add.existing(this.player);
  }

  createEnemies(){
    for(var i = 0; i < 1; i++){
      this.enemies.add(new Enemy(this.game, -25, Math.random() * window.innerHeight, 'zombies', 2, true));
    }
  }

  createCrates(){
    this.towerCrates.add(new TowerCrate(this.game, window.innerWidth+20, Math.random() * window.innerHeight, 'crate', 10, false));
  }

  createHealthPot(){
    this.healthPots.add(new HealthPot(this.game, window.innerWidth+20, Math.random() * window.innerHeight, 'heart', 10, 5, false, false));
  }


    activateBlue(){
      let style = { font: "100px Arial", fill: "#FFFFFF"};
      this.player.speed = 15;
      this.blueActivated = false;
      this.bluue.kill();
      this.game.add.text(window.innerWidth/2.35 + 5, 10, "X", style);
    }

    prepareBlue(){
      this.bluue = new BluePowerUp(this.game, window.innerWidth+20, 100, 'blue');
      this.physics.enable(this.bluue, Phaser.Physics.ARCADE);
      this.game.add.existing(this.bluue);
      this.blueActivated = true;
      this.enemySpawnRate -= 5;
    }

    activateGreen(){
      let style = { font: "100px Arial", fill: "#FFFFFF"};
      this.player.fireRate = 500;
      this.greenActivated = false;
      this.green.kill();
      this.game.add.text(window.innerWidth/2.75, 10, "X", style);
    }

    prepareGreen(){
      this.green = new GreenPowerUp(this.game, window.innerWidth+20, 100, 'green');
      //let greenSmoke = this.add.sprite(this.player.x, this.player.y, 'greenSmoke');
      this.physics.enable(this.green, Phaser.Physics.ARCADE);
      this.game.add.existing(this.green)
      this.greenActivated = true;
      this.enemySpawnRate -= 5;
    }

    activateRed(){
      let style = { font: "100px Arial", fill: "#FFFFFF" };
      this.player.setHealth(100);
      this.player.heal(100);
      this.redActivated = false;
      this.red.kill();
      this.game.add.text(window.innerWidth/2.55, 10, "X", style);
    }

    prepareRed(){
      this.red = new RedPowerUp(this.game, window.innerWidth+20, 100, 'red');
      this.physics.enable(this.green, Phaser.Physics.ARCADE);
      this.game.add.existing(this.red);
      this.redActivated = true;
      this.enemySpawnRate -= 5;
    }

    activateYellow(){
      let style = { font: "100px Arial", fill: "#FFFFFF" };
      this.tower.setMaxHealth(1000);
      this.yellowActivated = false;
      this.yellow.kill();
      this.game.add.text(window.innerWidth/3.3, 10, "X", style);
    }

    prepareYellow(){
      this.yellow = new YellowPowerUp(this.game, window.innerWidth+20, 100, 'yellow');
      this.physics.enable(this.yellow, Phaser.Physics.ARCADE);
      this.game.add.existing(this.yellow);
      this.yellowActivated = true;
      this.enemySpawnRate -= 5;
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

  bossTextIntroIsDone(){
    return this.bossText && (this.bossText.x > window.innerWidth + 100) && !this.bossMode;
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
  }

  damagePlayer() { 
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

  gameOver(){
    this.game.state.start('gameOver');
  }

  isBossRound(){
    return (this.score % this.bossWave == 0 && this.score != 0) && !this.bossText;
  }

}
