import {
  players,
  currentWinner,
  selectedType,
  selectedHan,
  selectedFu,
  selectedLoser
} from "./state.js";

import { calcPoint } from "./score.js";

import { updateScreen } from "./ui.js";

export function confirmWin() {

  let point = calcPoint(selectedHan, selectedFu);

  if (selectedType === "t") {

    for (let i = 0; i < 4; i++) {

      if (i !== currentWinner) {

        players[i].score -= point;

        players[currentWinner].score += point;
      }
    }

  } else {

    players[selectedLoser].score -= point * 3;

    players[currentWinner].score += point * 3;
  }

  updateScreen();

  document.getElementById("winMenu")
    .classList.add("hidden");
}