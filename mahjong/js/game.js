import {
  players,
  point,
  kyoku,
  honba,
  kyotaku,
  dealer,
  wind,
  currentWinner,
  selectedType,
  selectedHan,
  selectedFu,
  setkyotaku,
  sethonba,
  setkyoku,
  selectedLoser
} from "./state.js";

import { calcPoint_tP } from "./score.js";
import { calcPoint_tC } from "./score.js";
import { calcPoint_rP } from "./score.js";
import { calcPoint_rC } from "./score.js";

import { updateScreen } from "./ui.js";

export function confirmWin() {
  
  let i = 0;
  
  if (selectedType === "t") {
    if(currentWinner === dealer) {
      calcPoint_tP(selectedHan, selectedFu);
      for (i = 0; i < 4; i++) {

      if (i !== currentWinner) {
        players[i].change -= point.child - kyotaku/3;
      } else{
        players[i].change += point.parent + kyotaku;
      }      
      }

      sethonba(1);
      setkyotaku(1);

    } else {
      calcPoint_tC(selectedHan, selectedFu);
      for (i = 0; i < 4; i++) {

      if (i !== currentWinner) {
        if (i === dealer) {
            players[i].change -= point.parent - kyotaku/3;
        } else {
            players[i].change -= point.child + kyotaku;
        }
      }
      players[currentWinner].change = point.parent + point.child*2  
      }

      setkyoku();
      sethonba(0);
      setkyotaku(0);
    }

  } else {
    if(currentWinner === dealer) {
        calcPoint_rP(selectedHan, selectedFu);
        players[selectedLoser].change -= point.child - kyotaku;
        players[currentWinner].change += point.parent + kyotaku;

        sethonba(1);
        setkyotaku(1);

    } else {
        calcPoint_rC(selectedHan, selectedFu);
        players[selectedLoser].change -= point.child - kyotaku;
        players[currentWinner].change += point.child + kyotaku;

        sethonba(0);
        setkyotaku(0);
        setkyoku();
    }
  }

  
  document.getElementById("result").classList.remove("hidden");
  i = 0;
  players.forEach((player, i) => {

    document.getElementById(`finalScore${i}`).textContent = player.score;
    document.getElementById(`diff${i}`).textContent = player.change;
  } );

  document.getElementById("selecthan").classList.add("hidden");

  document.getElementById("selectfu").classList.add("hidden");

  [20,25,30,40,50].forEach(f => {
    document.getElementById(`fu-${f}`)
      .classList.add("hidden");
  });

  document.getElementById("winMenu").classList.add("hidden");
  
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
        players[i].score += players[i].change;
    }

  } else {

    players[selectedLoser].score += players[selectedLoser].change;

    players[currentWinner].score += players[currentWinner].change;
  }

  updateScreen();

   document.getElementById("result").classList.add("hidden");
 
  for (let i = 0; i < 4; i++) {
    players[i].change = 0;
  }
}