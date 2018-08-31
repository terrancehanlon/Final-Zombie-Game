import Bullet from '../models/Bullets.js';
import HealhPot from '../models/HealthPot.js';

export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, img, frame, coming_from_left) {
        super(game, x, y, img);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.health = 100;
        this.startHealth = this.health;

        this.animations.add("zombies", [0, 1, 2, 4, 5, 6, 7]);
        this.animations.play('zombies', game.rnd.integerInRange(5, 10), true);
        this.scale.x = -1;
        this.health_bar = new BossHealthBar(this.game, this.x + 15, this.y - 90, 'Healthbar');

        this.text = this.game.add.text(this.health_bar.x + 10, this.health_bar.y, this.health, style2)
        this.text2 = this.game.add.text(this.health_bar.x + 75, this.health_bar.y, "/" + this.startHealth, style2);
        this.coming_from_left = coming_from_left;

        if (this.coming_from_left) {
            this.scale.x = 1;
        }
    }

    create() {
        console.log("Create Boss");
    }

    setBossHealth(value) {
        this.health += value;
    }

    deductBossHealth(value) {
        this.health -= value;
        if (this.health <= 0) {
            this.kill();
        }
    }
    update() {
        if (this.coming_from_left) {
            this.x += 2;
        } else {
            this.x -= 2;
        }
    }
}