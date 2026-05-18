import {
  players,
  wind,
  kyoku,
  honba,
  kyotaku,
  setCurrentWinner,
  setSelectedType,
  setSelectedHan,
  setSelectedFu,
  setSelectedLoser
} from "./state.js";

export function updateScreen() {

  players.forEach((player, i) => {

    document.getElementById(`score${i}`).textContent =
      player.score;
  });

  document.getElementById("round").textContent =
    `${wind}${kyoku}局`;

  document.getElementById("honba").textContent =
    `${honba}本場`;

  document.getElementById("kyotaku").textContent =
    `供託: ${kyotaku}`;
}

export function win(playerIndex) {

  setCurrentWinner(playerIndex);

  document
    .getElementById("winMenu")
    .classList.remove("hidden");
}

export function setType(type) {

  setSelectedType(type);

  document.getElementById("type-t")
    .classList.remove("selected");

  document.getElementById("type-r")
    .classList.remove("selected");

  if (type === "t") {

    document.getElementById("type-t")
      .classList.add("selected");

    document.getElementById("ronSelect")
      .classList.add("hidden");

  } else {

    document.getElementById("type-r")
      .classList.add("selected");

    document.getElementById("ronSelect")
      .classList.remove("hidden");
  }
}

export function setHan(han) {

  setSelectedHan(han);

  [1,2,3,4].forEach(h => {
    document.getElementById(`han-${h}`)
      .classList.remove("selected");
  });

  document.getElementById(`han-${han}`)
    .classList.add("selected");
}

export function setFu(fu) {

  setSelectedFu(fu);

  [20,30,40,50].forEach(f => {

    document.getElementById(`fu-${f}`)
      .classList.remove("selected");
  });

  document.getElementById(`fu-${fu}`)
    .classList.add("selected");
}

export function setLoser(loser) {

  setSelectedLoser(loser);

  [0,1,2,3].forEach(i => {

    document.getElementById(`loser-${i}`)
      .classList.remove("selected");
  });

  document.getElementById(`loser-${loser}`)
    .classList.add("selected");
}