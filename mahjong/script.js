const players = [
  { name: "A", score: 25000 },
  { name: "B", score: 25000 },
  { name: "C", score: 25000 },
  { name: "D", score: 25000 }
];

function addScore(index) {
  players[index].score += 1000;

  updateScreen();
}

function minusScore(index) {
  players[index].score -= 1000;

  updateScreen();
}

function updateScreen() {
  document.getElementById("score0").textContent =
    players[0].score;

  document.getElementById("score1").textContent =
    players[1].score;

  document.getElementById("score2").textContent =
    players[2].score;

  document.getElementById("score3").textContent =
    players[3].score;
  
  document.getElementById("round").textContent =
  `${wind}${kyoku}局`;

  document.getElementById("honba").textContent =
  `${honba}本場`;

  document.getElementById("kyotaku").textContent =
  `供託: ${kyotaku}`;
}

let dealer = 0;
let wind = "東";
let kyoku= 1;
let honba = 0;
let dealer = 0;
let kyotaku = 0;

function win(playerIndex) {

  // 親が上がった
  if (playerIndex === dealer) {

    honba++;
    kyotaku += 300;

  } else {

    // 子が上がった

    honba = 0;
    dealer++;
    kyoku++;


    if (dealer > 3) {
      dealer = 0;
    }

    if (kyoku > 4) {

      kyoku = 1;

      if (wind === "東") {
        wind = "南";
      }
    }
  }

  updateScreen();
}