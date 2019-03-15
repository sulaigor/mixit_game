// import Banner from "./components/start_banner.js";

// Banner.init('message-banner');

import Menu from "./classes/menu.js";

let menu = new Menu('message-banner');
let itemsTypes = 'egg-1 egg-2 egg-3 egg-4 egg-5 egg-6 egg-7'.split(' ');
// let itemsTypes = 'mix fruit box bowl'.split(' ');

menu.setItemsTypes(itemsTypes);
menu.setMainSelector('.main');
menu.setLivesSelector('.lives-wrapper');
menu.setScoreSelector('.score');
menu.setHighestScoreSelector('.highest-score');

menu.startBtn('start-btn');
menu.stopBtn('stop-btn');