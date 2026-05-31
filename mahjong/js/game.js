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
  setdealer,
  selectedLoser
} from "./state.js";

import { calcPoint_tP } from "./score.js";
import { calcPoint_tC } from "./score.js";
import { calcPoint_rP } from "./score.js";
import { calcPoint_rC } from "./score.js";

import { updateScreen } from "./ui.js";

export function reach(index) {
  
  const btn = document.getElementById(`reachbtn${index}`);
  
  if(btn.classList.contains("selected")) {
    btn.classList.remove("selected");
    setkyotaku(3);
    players[index].score += 1000;
  } else {
    btn.classList.add("selected");
    setkyotaku(2);
    players[index].score -= 1000;
  }

  updateScreen();
  
}



export function confirmWin() {
  
  let i = 0;
  
  if (selectedType === "t") {
    if(currentWinner === dealer) {
      calcPoint_tP(selectedHan, selectedFu);
      for (i = 0; i < 4; i++) {

      if (i !== currentWinner) {
        players[i].change -= point.child + honba*100;
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
            players[i].change -= point.parent + honba*100;
        } else {
            players[i].change -= point.child + honba*100;
        }
      }
      }
      players[currentWinner].change = point.parent + point.child*2 + kyotaku;

      setkyoku();
      sethonba(0);
      setkyotaku(0);
      setdealer();
    }

  } else {
    if(currentWinner === dealer) {
        calcPoint_rP(selectedHan, selectedFu);
        players[selectedLoser].change -= point.child + kyotaku;
        players[currentWinner].change += point.parent + kyotaku;

        sethonba(1);
        setkyotaku(1);

    } else {
        calcPoint_rC(selectedHan, selectedFu);
        players[selectedLoser].change -= point.child + kyotaku;
        players[currentWinner].change += point.child + kyotaku;

        sethonba(0);
        setkyotaku(0);
        setkyoku();
        setdealer();
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
  [0,1,2,3].forEach(i => {
    document.getElementById(`reachbtn${i}`)
      .classList.remove("selected");
  });

  updateScreen();

   document.getElementById("result").classList.add("hidden");
 
  for (let i = 0; i < 4; i++) {
    players[i].change = 0;
  }
}