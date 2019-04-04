export default class CrackEgg {
  constructor(position, hiddenTime) {
    this.position = position;
    this.hiddenTime = hiddenTime;
    this.domElem = document.querySelector('.crack-egg.position-' + this.position);
  }

  activate(src) {
    let image = this.domElem.querySelector('img');
    image.src = src;
    // this.domElem.append(image);
    this.domElem.classList.add('active');
    setTimeout(() => {
      this.domElem.classList.remove('active');
      // TODO problem 404
      image.src = null;
      // image.remove();
    }, this.hiddenTime);
  }
}