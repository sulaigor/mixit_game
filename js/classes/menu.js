import Game from "./game.js";

export default class Menu {
  constructor(startBannerId, controlsBannerId) {
    this.startBannerId = startBannerId;
    this.controlsBannerId = controlsBannerId;
    this.startBannerDomElem = document.getElementById(this.startBannerId);
    this.controlsBannerDomElem = document.getElementById(this.controlsBannerId);
    this.itemsTypes = null;
    this.difficulty = null;
    this.numberOfBelts = null;
    this.mainSelector = null;
    this.livesSelector = null;
    this.scoreSelector = null;
    this.highScoreSelector = null;
    this.keyInputSelector = null;
    this.game = null;

    let controls = localStorage.getItem(btoa('controls'));
    if(controls) this.controls = JSON.parse(atob(controls));
    else
    {
      this.controls = {
        position_1: 'q',
        position_2: 'a',
        position_3: 'd',
        position_4: 'e',
      };
    }

    this.initGameOverEvent();
  }

  initGameOverEvent() {
    document.addEventListener('gameover', () => {
      this.setStartBannerText('Game Over');
      this.startBannerDomElem.classList.add('active');
      this.game.getPlayer().reset();
      this.setButtonText('start-btn', 'New game');
      this.game = null;
      this.setCrackEggsHidden();
    });
  }

  setKeyInputSelector(keyInputSelector) {
    this.keyInputSelector = keyInputSelector;
    this.setKeyOfPositions();
  }

  setCrackEggsHidden() {
    for(let crackEgg of document.querySelectorAll('.crack-egg'))
      crackEgg.classList.remove('active');
  }

  setStartBannerText(newText) {
    this.startBannerDomElem.querySelector('h1').textContent = newText;
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
    this.highScoreSelector = highestScoreSelector;
  }

  showHighScore() {
    let highScore = localStorage.getItem(btoa('highScore'));
    if(highScore)
    {
      highScore = atob(highScore);
      let highScoreDomElem = document.querySelector(this.highScoreSelector);
      highScoreDomElem.textContent = highScore;
      highScoreDomElem.parentNode.classList.add('visible');
    }
  }

  startBtn(id) {
    let startBtn = document.getElementById(id);
    startBtn.addEventListener('click', () => {
      this.showHighScore();
      this.startBannerDomElem.classList.remove('active');
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

  controlsBtn(id) {
    let controlsBtn = document.getElementById(id);
    controlsBtn.addEventListener('click', () => {
      this.startBannerDomElem.classList.remove('active');
      document.getElementById(this.controlsBannerId).classList.add('active');
      let keyInputs = document.querySelectorAll(this.keyInputSelector);
      for(let input of keyInputs) this.setInput(input);
    });
  }

  goBackBtn(id) {
    let goBackBtn = document.getElementById(id);
    goBackBtn.addEventListener('click', () => {
      this.startBannerDomElem.classList.add('active');
      this.controlsBannerDomElem.classList = 'banner';
    });
  }

  setActiveSettingBtn(changeBtnId, saveBtnId) {
    let buttons = [document.getElementById(changeBtnId), document.getElementById(saveBtnId)];
    for(let button of buttons)
      button.addEventListener('click', () =>
      {
        this.controlsBannerDomElem.classList.toggle('show-input')
        if(button.id == saveBtnId)
          localStorage.setItem(btoa('controls'), btoa(JSON.stringify(this.controls)));
      });
  }

  setKeyOfPositions() {
    let keysInputs = document.querySelectorAll(this.keyInputSelector);
    for(let input of keysInputs)
      input.addEventListener('input', (event) => {
        let anotherPositons = [];
        for(let position in this.controls)
          if(position != input.name) anotherPositons.push(this.controls[position]);

        if(anotherPositons.includes(input.value))
        {
          input.parentNode.classList.add('bad-input');
          setTimeout(() => {
            input.value = '';
            input.parentNode.classList.remove('bad-input');
          }, 1000);
        }
        else this.setControls(input);
      });
  }

  setControls(input) {
    this.controls[input.name] = input.value;
    this.setInput(input);
  }

  setInput(input) {
    input.value = '';
    input.placeholder = this.controls[input.name];
    input.parentNode.querySelector('.key').textContent = this.controls[input.name];
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

    this.game.setControls(this.controls);
    this.game.startGame();
  }
}