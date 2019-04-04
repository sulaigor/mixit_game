import Item from "./item.js";
import Player from "./player.js";

export default class Game {
  constructor(gameSelector, livesSelector, scoreSelector, itemTypes, difficulty = 1, numberOfBelts = 4) {
    this.items = [];
    this.gameSelector = gameSelector;
    this.livesSelector = livesSelector;
    this.scoreSelector = scoreSelector;
    this.itemTypes = itemTypes;
    this.numberOfBelts = numberOfBelts;
    this.difficulty = difficulty;
    this.intervalTime = 1000;
    this.catchedItems = 0;
    this.lives = 10;
    this.livesDomElem = document.querySelector(this.livesSelector);
    this.gameOverEvent = new Event('gameover');
    this.gameInterval = null;
    this.controls = null;

    this.setScore();
    this.insertLives();
    this.player = new Player('.player');
  }

  insertLives() {
    let live = document.createElement('div');
    live.classList.add('live');
    for(let i = 0; i < this.lives; ++i) this.livesDomElem.append(live.cloneNode(true));
  }

  addNewLive() {
    this.lives++;
    let live = document.createElement('div');
    live.classList.add('live');
    this.livesDomElem.append(live.cloneNode(true));
  }

  removeLive() {
    this.lives--;
    this.livesDomElem.querySelector('.live').remove();
  }

  setPlayerPosition(position) {
    this.player.move(position);
  }

  setControls(controls) {
    this.controls = controls;
  }

  removePlayerMoving() {
    this.player.getDomElem().parentNode.innerHTML += '';
  }

  getRandomItemTypeIndex() {
    return Math.floor(Math.random() * this.itemTypes.length);
  }

  getRandomNumberOfBelt() {
    return Math.floor(Math.random() * (this.numberOfBelts)) + 1;
  }

  getPlayer() {
    return this.player;
  }

  moveItems() {
    this.items.forEach(item => {
      item.move(this.player.getActualPosition());
      if(item.isCatched()) this.catchedItems++;
      if(item.isRemoved()) this.removeLive();
    });

    this.items = this.items.filter(item => !item.isCatchedOrRemoved());
  }

  clearItems() {
    for(let item of this.items) item.removeDomElem(true);
    this.items = null;
  }

  setScore() {
    for(let scoreWrapper of document.querySelectorAll(this.scoreSelector)) scoreWrapper.textContent = this.catchedItems * 10;
  }

  saveHighScore() {
    let score = this.catchedItems * 10;
    let savedHighScore = localStorage.getItem(btoa('highScore'));
    if(!savedHighScore || atob(savedHighScore) < score)
      localStorage.setItem(btoa('highScore'), btoa(score));
  }

  decreaseIntervalTime(numbers) {
    numbers.forEach(number => {
      if(this.catchedItems == number)
      {
        if(number <= 50) this.intervalTime -= 100 * this.difficulty;
        else this.intervalTime -= 50 * this.difficulty;
        this.addNewLive();
      }
    });
  }

  generateItems(numberOfNewItems) {
    for(let i = 0; i < numberOfNewItems; ++i)
    {
      let type = this.itemTypes[this.getRandomItemTypeIndex()];
      let belt = this.getRandomNumberOfBelt();
      let item = new Item(type, belt);
      item.insertDomElem('.belt.belt-' + item.getBeltPosition());
      this.items.push(item);
    }
  }

  restartGame() {
    this.stopGame();
    this.startGame();
  }

  stopGame() {
    clearInterval(this.gameInterval);
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      this.actualInterval = this.intervalTime;

      this.decreaseIntervalTime('25 50 75 100 125 150 200 250 300'.split(' '));
      this.moveItems();
      this.setScore();
      this.generateItems(1);

      if(this.intervalTime <= 0 || this.lives == 0)
      {
        this.stopGame();
        this.clearItems();
        this.setPlayerPosition(5);
        this.saveHighScore();
        document.dispatchEvent(this.gameOverEvent);
        this.removePlayerMoving();
      }
      else if(this.actualInterval != this.intervalTime) this.restartGame();
    }, this.intervalTime);
  }
}