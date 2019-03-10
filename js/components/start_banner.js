import Game from "./../classes/game.js";

let Banner = {
  messageBanner: null,
  game: null,

  init: function (id) {
    this.messageBunner = document.getElementById(id);
    let itemTypes = 'mix fruit box bowl'.split(' ');
    this.game = new Game('.main', '.lives-wrapper', '.score span', itemTypes, 1);

    this.startButton('start-btn');
    this.stopButton('stop-btn');

    // function click(event) {
    //   Banner.game.startGame();
    //   event.preventDefault();
    //   Banner.messageBunner.classList.remove('active');
    //   document.removeEventListener('click', click);
    // }
    // document.addEventListener('click', click);

    function press(event) {
      Banner.game.startGame();
      event.preventDefault();
      Banner.messageBunner.classList.remove('active');
      document.removeEventListener('keypress', press);
    }
    document.addEventListener  ('keypress', press);
  },

  startButton: function (id) {
    let startBtn = document.getElementById(id);
    startBtn.addEventListener('click', () => this.game.startGame());
  },

  stopButton: function (id) {
    let stopBtn = document.getElementById(id);
    stopBtn.addEventListener('click', () => this.game.stopGame());
  },

};

export default Banner;