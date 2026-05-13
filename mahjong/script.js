let score = 25000;

function addScore() {
  score += 1000;

  document.getElementById("scoreA").textContent = score;
}

function minusScore() {
  score -= 1000;

  document.getElementById("scoreA").textContent = score;
}