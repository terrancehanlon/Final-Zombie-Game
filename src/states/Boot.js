export default class Boot {

    preload() {
	  console.log("preloader");
    }

    create() {
      this.game.state.start('preload');
    }
}
