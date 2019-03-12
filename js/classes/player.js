export default class Player {
  constructor(playerSelector) {
    this.playerSelector = playerSelector;
    this.position = 0;
    this.playerDomElem = document.querySelector(this.playerSelector);
  }

  reset() {
    this.playerDomElem.classList = 'player';
    this.move(0);
  }

  move(position) {
    this.playerDomElem.classList.remove('position-' + this.position);
    this.position = position;
    this.playerDomElem.classList.add('position-' + this.position);
  }

  getActualPosition() {
    return this.position;
  }

  getDomElem() {
    return this.playerDomElem;
  }
}