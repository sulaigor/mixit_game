export default class Player {
  constructor(playerSelector) {
    this.playerSelector = playerSelector;
    this.position = 0;
    this.playerDomElem = document.querySelector(this.playerSelector);

    this.setMovingEvents();
  }

  reset() {
    this.playerDomElem.classList = 'player';
    this.move(0);
  }

  move(position) {
    this.playerDomElem.classList.remove('position-' + this.position);
    this.position = position;
    this.playerDomElem.classList.add('position-' + this.position);
    this.wave();
  }

  setMovingEvents() {
    for(let i = 1; i < 5; ++i)
      document.addEventListener('player-position_' + i, () => this.move(i));
  }

  getActualPosition() {
    return this.position;
  }

  getDomElem() {
    return this.playerDomElem;
  }

  wave() {
    if(this.playerDomElem.classList.contains('wave')) this.playerDomElem.classList.remove('wave');
    setTimeout(() => this.playerDomElem.classList.add('wave'), 10);
  }
}