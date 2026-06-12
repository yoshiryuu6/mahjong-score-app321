import {
  updateScreen,
  win,
  setType,
  setHan,
  setFu,
  setLoser
} from "./ui.js";

import {
  confirmWin,
  Settlement,
  reach,
  ryukyoku,
  tenpai
} from "./game.js";

window.win = win;

window.setType = setType;

window.setHan = setHan;

window.setFu = setFu;

window.setLoser = setLoser;

window.confirmWin = confirmWin;

window.Settlement = Settlement;

window.reach = reach;

window.ryukyoku = ryukyoku;

window.tenpai = tenpai;


updateScreen();