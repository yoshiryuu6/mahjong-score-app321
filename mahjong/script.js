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
}