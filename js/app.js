// import Banner from "./components/start_banner.js";

// Banner.init('message-banner');

import Menu from "./classes/menu.js";
// import Item from "./classes/item.js";
// import CrackEgg from "./classes/crack_egg.js";

let menu = new Menu('message-banner', 'controls-banner');
let itemsTypes = 'egg-1 egg-2 egg-3 egg-4 egg-5 egg-6 egg-7'.split(' ');
// let itemsTypes = 'mix fruit box bowl'.split(' ');

menu.setItemsTypes(itemsTypes);
menu.setMainSelector('#game-container');
menu.setLivesSelector('.lives-wrapper');
menu.setScoreSelector('.score');
menu.setHighestScoreSelector('.highest-score');

menu.startBtn('start-btn');
menu.stopBtn('stop-btn');
menu.controlsBtn('controls-btn');
menu.goBackBtn('go-back-btn');
menu.setKeyInputSelector('.key-input');
menu.setActiveSettingBtn('change-setting-btn', 'save-setting-btn');

// let item = new Item('egg-1', 1);
// console.log(item.getItemType(), item.getCrackGifSrc(), item.getBeltPosition());
// item.insertDomElem('body .main');
//
// let crackEgg = new CrackEgg(1);

// setInterval(() => item.move(), 1000);

// let crackEgg = document.querySelector('.crack-egg');
// let src = crackEgg.querySelector('img').src;
// crackEgg.querySelector('img').src = '';
//
// setTimeout(() => {
//   crackEgg.style.displey = 'block';
//   crackEgg.querySelector('img').src = src
// }, 2000);
