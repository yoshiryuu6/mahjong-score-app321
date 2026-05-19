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

        players[i].change -= point;

        players[currentWinner].change += point;
      }
    }

  } else {

    players[selectedLoser].change -= point * 3;

    players[currentWinner].change += point * 3;
  }

  document.getElementById("result").classList.remove("hidden");

  players.forEach((player, i) => {

    document.getElementById(`finalScore${i}`)
      .textContent = player.score;
    document.getElementById(`diff${i}`).textContent = `${players[i].change}`;
  } );

    document.getElementById("winMenu")
    .classList.add("hidden");
  
  document.querySelectorAll("#winMenu button")
  .forEach(btn => {
    btn.classList.remove("selected");
  });

  document.getElementById("ronSelect")
  .classList.add("hidden");

}

export function Settlement() {
    if (selectedType === "t") {

    for (let i = 0; i < 4; i++) {

      if (i !== currentWinner) {

        players[i].score += players[i].change;

        players[currentWinner].score += players[i].change;
      }
    }

  } else {

    players[selectedLoser].score += players[i].change * 3;

    players[currentWinner].score += players[i].change * 3;
  }

  updateScreen();

   document.getElementById("result").classList.add("hidden");
 
  for (let i = 0; i < 4; i++) {
    players[i].change = 0;
  }
}