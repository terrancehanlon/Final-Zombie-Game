export default class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.load.image('bg', 'assets/images/bg.jpg');
    this.load.image("healthbar", 'assets/images/health_bar.png');
    this.load.image('tower', 'assets/images/tower_2.png');
    this.load.image('gameOver', 'assets/images/blizzardskull.png');
    this.load.image('heart', 'assets/images/heart.png');
    this.load.image('bullet', 'assets/images/new_bullet.png');
    this.load.image('blood1', 'assets/images/b/b1.png');
    this.load.image('blood2', 'assets/images/b/b2.png');
    this.load.image('blood3', 'assets/images/b/b3.png');
    this.load.audio('shootSound', 'assets/audio/shootSound.mp3');

    this.load.image('blue', 'assets/images/InfinityGems/ball_blue.png');
    this.load.image('green', 'assets/images/InfinityGems/ball_green.png');
    this.load.image('purple', 'assets/images/InfinityGems/ball_purple.png');
    this.load.image('red', 'assets/images/InfinityGems/ball_red.png');
    this.load.image('yellow', 'assets/images/InfinityGems/ball_yellow.png');

    this.load.audio('music', 'assets/audio/music.mp3');


    this.load.image('boss', 'assets/images/cat.png');
    this.load.image('dragon', 'assets/images/DragonBoss.png');
    this.load.image('crate', 'assets/images/crate.png');
    this.load.spritesheet('player', 'assets/images/shooting.png', 135, 89.5);
    this.load.image('button_pause', 'assets/images/button_pause.png');
    //this.load.image('zombie1', 'assets/images/zombie.png');
    //this.load.spritesheet('boss1', "assets/images/BossZombie.png", 360, 480);
    this.load.image('boss', "assets/images/zombieBoss1.png");

  }

  create() {
    this.game.load.spritesheet('zombies', "assets/images/SmallerZombies.png", 85, 102.5);

    this.add.sprite(0,0, 'bg');
    this.load.image('blood1', 'assets/images/b/b1.png');
    this.load.image('blood2', 'assets/images/b/b2.png');
    this.load.image('blood3', 'assets/images/b/b3.png');


    this.load.start();
  }

  update() {
    console.log(this.ready);
    this.game.state.start('startScreen');
    /*
      this.ready is false ??
      if (this.ready) {
        this.game.state.start('startScreen');
    } */

  }

  onLoadComplete() {
      this.ready = true;
  }

}
