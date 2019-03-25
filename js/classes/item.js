import CrackEgg from "./crack_egg.js";

export default class Item {
  constructor(type, beltPosition) {
    this.type = type;
    this.beltPosition = beltPosition;
    this.removed = false;
    this.catched = false;
    this.crackGifSrc = 'img/crack-' + this.type + '.gif';
    this.actualPosition = 1;
    this.lastPosition = 6;
    this.domElem = this.createDomElem();

    this.crackEgg = new CrackEgg(this.beltPosition, 500);
  }

  getItemType() {
    return this.type;
  }

  getCrackGifSrc() {
    return this.crackGifSrc;
  }

  getBeltPosition() {
    return this.beltPosition;
  }

  insertDomElem(elementSelector) {
    document.querySelector(elementSelector).append(this.domElem);
  }

  removeDomElem(removeNow = false) {
    if(this.removed)
    {
      this.domElem.remove();
      this.crackEgg.activate(this.crackGifSrc);
    }
    else if(this.catched || removeNow) this.domElem.remove();
  }

  isRemoved() {
    return this.removed;
  }

  isCatched() {
    return this.catched;
  }

  isCatchedOrRemoved() {
    return this.catched || this.removed;
  }

  onLastPosition() {
    return this.actualPosition == this.lastPosition;
  }

  createDomElem() {
    let domElem = document.createElement('div');
    domElem.classList.add('item');
    domElem.classList.add(this.type);
    domElem.classList.add('belt-' + this.beltPosition);
    this.setPosition(this.actualPosition, domElem);
    return domElem;
  }

  setPosition(position, domElem = this.domElem) {
    domElem.classList.add('position-' + position);
  }

  removePositionClass(position, domElem = this.domElem) {
    domElem.classList.remove('position-' + position);
  }

  move(playerPosition) {
    this.removePositionClass(this.actualPosition);
    this.actualPosition++;

    if(this.beltPosition == playerPosition && this.actualPosition >= this.lastPosition)
      this.catched = true;
    else if(this.actualPosition > this.lastPosition) this.removed = true;
    else this.setPosition(this.actualPosition);

    this.removeDomElem();
  }

}