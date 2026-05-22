export const players = [
  { name: "A", score: 25000 , change: 0},
  { name: "B", score: 25000 , change: 0},
  { name: "C", score: 25000 , change: 0},
  { name: "D", score: 25000 , change: 0}
];
export const point = [
    {winner: 0, loser: 0}
];

export let dealer = 0;
export let wind = "東";
export let kyoku = 1;
export let honba = 0;
export let kyotaku = 0;

export let currentWinner = null;
export let selectedType = null;
export let selectedHan = null;
export let selectedFu = null;
export let selectedLoser = null;

export function setPoint(w, l) {
    point.winner = w;
    point.loser = l;
}
export function setCurrentWinner(value) {
  currentWinner = value;
}

export function setSelectedType(value) {
  selectedType = value;
}

export function setSelectedHan(value) {
  selectedHan = value;
}

export function setSelectedFu(value) {
  selectedFu = value;
}

export function setSelectedLoser(value) {
  selectedLoser = value;
}