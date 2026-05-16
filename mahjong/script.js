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
  document.getElementById("score0").textContent = players[0].score;

  document.getElementById("score1").textContent = players[1].score;

  document.getElementById("score2").textContent = players[2].score;

  document.getElementById("score3").textContent = players[3].score;
  
  document.getElementById("round").textContent = `${wind}${kyoku}局`;

  document.getElementById("honba").textContent = `${honba}本場`;

  document.getElementById("kyotaku").textContent = `供託: ${kyotaku}`;
}

let dealer = 0;
let wind = "東";
let kyoku= 1;
let honba = 0;
let kyotaku = 0;
let currentWinner = null;
let selectedType = null;
let selectedHan = null;
let selectedFu = null;
let selectedLoser = null;

function win(playerIndex) {
  
  currentWinner = playerIndex;
  
  document.getElementById("winMenu").classList.remove("hidden");
}

function calcPoint(han, fu) {

  let base = fu * Math.pow(2, han + 2);

  return Math.ceil(base / 100) * 100;
}

function setType(type) {
  selectedType = type;

  // すべてのタイプボタンから selected を外す
  document.querySelectorAll("#winMenu button").forEach(btn => {
    if (btn.textContent === "ツモ" || btn.textContent === "ロン") {
      btn.classList.remove("selected");
    }
  });

  // 押したボタンに selected を付ける
  if (type === "t") {
    document.querySelector("button[onclick=\"setType('t')\"]").classList.add("selected");
    document.getElementById("ronSelect").classList.add("hidden");
  } else {
    document.querySelector("button[onclick=\"setType('r')\"]").classList.add("selected");
    document.getElementById("ronSelect").classList.remove("hidden");
  }
}

function setHan(han) {
  selectedHan = han;

  document.querySelectorAll("button[onclick^='setHan']").forEach(btn => {
    btn.classList.remove("selected");
  });

  document.querySelector(`button[onclick="setHan(${han})"]`).classList.add("selected");
}

function setFu(fu) {
  selectedFu = fu;

  document.querySelectorAll("button[onclick^='setFu']").forEach(btn => {
    btn.classList.remove("selected");
  });

  document.querySelector(`button[onclick="setFu(${fu})"]`).classList.add("selected");
}

function setLoser(loser) {
  selectedLoser = loser;

  document.querySelectorAll("button[onclick^='setLoser']").forEach(btn => {
    btn.classList.remove("selected");
  });

  document.querySelector(`button[onclick="setLoser(${loser})"]`).classList.add("selected");
}

function confirmWin() {

  let point = calcPoint(selectedHan, selectedFu);

  if (selectedType === "t") {

    // ツモ
    for (let i = 0; i < 4; i++) {

      if (i !== currentWinner) {

        players[i].score -= point;

        players[currentWinner].score += point;
      }
    }

  } else {

    // ロン
    players[selectedLoser].score -= point * 3;

    players[currentWinner].score += point * 3;
  }

  // 親処理
  if (currentWinner === dealer) {

    honba++;

    kyotaku += 300;

  } else {

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

  document.getElementById("winMenu")
    .classList.add("hidden");
}

