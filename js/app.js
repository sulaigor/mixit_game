// import Banner from "./components/start_banner.js";

// Banner.init('message-banner');

import Menu from "./classes/menu.js";

let menu = new Menu('message-banner');

menu.setItemsTypes('mix fruit box bowl'.split(' '));
menu.setMainSelector('.main');
menu.setLivesSelector('.lives-wrapper');
menu.setScoreSelector('.score');
menu.setHighestScoreSelector('.highest-score');

menu.startBtn('start-btn');
menu.stopBtn('stop-btn');
