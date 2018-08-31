export default class BossModel {

    constructor(bossHealth) {
        this.health = bossHealth;
        this.speed = 9;
    }

    decreaseBossHealth(healthValue) {
        this.health -= healthValue;
    }

    increaseBossHealth(healthValue) {
        this.health += healthValue;
    }

    decreaseBossMovement(speedValue) {
        let tempMovementSpeed = this.speed;
        if (speedValue > this.speed) {
            this.speed = tempMovementSpeed;
        }

        else
            this.speed -= speedValue;
    }

    increaseBossMovement(speedValue) {
        this.speed += speedValue;
    }
}