export const players = [
  { name: "A", score: 25000 , change: 0},
  { name: "B", score: 25000 , change: 0},
  { name: "C", score: 25000 , change: 0},
  { name: "D", score: 25000 , change: 0}
];
export const point = [
    {parent: 0, child: 0}
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

export function setPoint(p, c) {
    point.parent = p;
    point.child = c;
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

export function setkyoku() {
    kyoku++;
    if(kyoku > 4) {
        kyoku = 1;
        setwind();
    }
}

export function setkyotaku(value) {
    if(value === 1) {
        kyotaku += 300;
    } else {
        kyotaku = 0;
    }
}

export function setwind() {
    wind = "南";
}

export function sethonba(value) {
    if(value === 1) {
        honba++;
    } else {
        honba = 0;
    }
}

export function setdealer() {
    dealer++;
    if(dealer > 3) {
        dealer = 0;
    }

}