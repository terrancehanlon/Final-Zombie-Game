export default class PlayerModel{

  constructor(health){
    this.health = health;
    this.totalHealth = health;
    this.speed = 5;
    this.damage = 10;
    this.isAlive = true;
  }

  deductHealth(val){
    this.health -= val;
    if(this.health <= 0){
      this.isAlive = false;
    }
  }

  increaseSpeed(val){
    this.speed += val;
  }

  decreaseSpeed(val){
    if(val > this.speed){
      this.speed = 5;
    }

    this.speed -= val;
  }

  addHealth(val){
    this.health += val;
  }
  increaseTotalHealth(val){
    this.totalHealth += val;
  }
  decreaseTotalHealth(val){
    if(this.totalHealth - val <= 0){
      this.totalHealth = 10;
    }else {
      this.totalHealth -= val;
    }
  }
  increaseDamage(val){
    this.damage += val;
  }
  decreaseDamage(val){
    if(this.damage - val <= 0){
      this.damage = 10;
    }else {
      this.damage -= val;
    }
  }

  autoKill(){
    this.isAlive = false;
  }

  ressurect(){
    this.isAlive = true;
  }

}
