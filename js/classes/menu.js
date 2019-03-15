import Game from "./game.js";

export default class Menu {
  constructor(bannerId) {
    this.bannerId = bannerId;
    this.bannerDomElem = document.getElementById(this.bannerId);
    this.itemsTypes = null;
    this.difficulty = null;
    this.numberOfBelts = null;
    this.mainSelector = null;
    this.livesSelector = null;
    this.scoreSelector = null;
    this.highestScoreSelector = null;
    this.game = null;

    this.initGameOverEvent();
  }

  initGameOverEvent() {
    document.addEventListener('gameover', () => {
      this.setBannerText('Game Over');
      this.bannerDomElem.classList.add('active');
      this.game.getPlayer().reset();
      console.log(this.game.getPlayer());

      this.setButtonText('start-btn', 'New game');
      this.game = null;
    });
  }

  setBannerText(newText) {
    this.bannerDomElem.querySelector('h1').textContent = newText;
  }

  setButtonText(id, newText) {
    document.getElementById(id).textContent = newText;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  setNumberOfBelts(numberOfBelts) {
    this.numberOfBelts = numberOfBelts;
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

  setHighestScoreSelector(highestScoreSelector) {
    this.highestScoreSelector = highestScoreSelector;

    let highestScore = localStorage.getItem('highestScore');
    if(highestScore)
    {
      let highestScoreDomElem = document.querySelector(this.highestScoreSelector);
      highestScoreDomElem.textContent = highestScore;
      highestScoreDomElem.parentNode.classList.add('visible');
    }
  }

  startBtn(id) {
    let startBtn = document.getElementById(id);
    startBtn.addEventListener('click', () => {
      this.bannerDomElem.classList.remove('active');
      setTimeout(() => {
        this.startNewGame();
        this.game.getPlayer().wave();
      }, 500);
    });
  }

  stopBtn(id) {
    let stopBtn = document.getElementById(id);
    stopBtn.addEventListener('click', () => this.game.stopGame());
  }

  startNewGame() {
    if(!this.difficulty)
      this.game = new Game(this.mainSelector, this.livesSelector, this.scoreSelector, this.itemsTypes);
    else if(!this.numberOfBelts)
      this.game = new Game(this.mainSelector, this.livesSelector, this.scoreSelector, this.itemsTypes,
        this.difficulty);
    else
      this.game = new Game(this.mainSelector, this.livesSelector, this.scoreSelector, this.itemsTypes,
        this.difficulty, this.numberOfBelts);
    this.game.startGame();
  }

}