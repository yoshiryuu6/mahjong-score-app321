export const players = [
  { name: "A", score: 25000 },
  { name: "B", score: 25000 },
  { name: "C", score: 25000 },
  { name: "D", score: 25000 }
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