import Game from "./game.js";

export default class Menu {
  constructor(bannerId) {
    this.bannerId = bannerId;
    this.bannerDomElem = document.getElementById(this.bannerId);
    this.itemsTypes = null;
    this.difficulty = null;
    this.mainSelector = null;
    this.livesSelector = null;
    this.scoreSelector = null;
    this.game = null;

  }

  startBanner() {
    this.setBannerText('Start game');
  }

  setBannerText(newText) {
    this.bannerDomElem.querySelector('h1').textContent = newText;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  setItemsTypes(itemsTypes) {
    this.itemsTypes = itemsTypes;
  }

  setMainSelector(mainSelector) {
    this.mainSelector = mainSelector;
  }

  setLivesSelector(livesSelector) {
    this.livesSelector = livesSelector;
  }

  setScoreSelector(scoreSelector) {
    this.scoreSelector = scoreSelector;
  }

  startBtn(id) {
    let startBtn = document.getElementById(id);
    startBtn.addEventListener('click', () => {
      this.bannerDomElem.classList.remove('active');
      setTimeout(() => this.startNewGame(), 500);
    });
  }

  stopBtn(id) {
    let stopBtn = document.getElementById(id);
    stopBtn.addEventListener('click', () => this.game.stopGame());
  }

  startNewGame() {
    this.game = new Game(this.mainSelector, this.livesSelector, this.scoreSelector, this.itemsTypes, this.difficulty);
    this.game.startGame();
  }

}