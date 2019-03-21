export default class CrackEgg {
  constructor(position, hiddenTime) {
    this.position = position;
    this.hiddenTime = hiddenTime;
    this.domElem = document.querySelector('.crack-egg.position-' + this.position);
    this.gifElem = this.domElem.querySelector('img');
  }

  activate(src) {
    this.gifElem.src = src;
    this.domElem.classList.add('active');
    setTimeout(() => {
      this.domElem.classList.remove('active');
      // TODO problem 404
      this.gifElem.src = null;
      // this.gifElem.src = '';
      // this.gifElem.src = 'img/crack-egg-default.png';
    }, this.hiddenTime);
  }
}