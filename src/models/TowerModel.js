export default class TowerModel {

    constructor(towerHealth) {
        this.health = towerHealth;
        this.speed = 0;
    }

    decreaseTowerHealth(towerHealthValue) {
        this.health -= towerHealthValue;
    }
    increaseTowerHealth(towerHealthValue){
      this.health += towerHealthValue;
    }
}
