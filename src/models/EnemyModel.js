export default class EnemyModel {

    constructor(enemyHealth) {
        this.health = enemyHealth;
        this.speed = 5;
    }

    deductEnemyHealth(value) {
        this.health -= value;
    }

    increaseEnemySpeed(value) {
        this.speed += value;
    }

    decreaseEnemySpeed(value) {
        let temporarySpeed = this.speed;
        if (value > this.speed) {
            this.speed = temporarySpeed;
        }

        else
            this.speed -= value;
    }

    increaseHealth(value) {
        this.health += value;
    }
}
