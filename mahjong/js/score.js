export function calcPoint(han, fu) {

  let base = fu * Math.pow(2, han + 2);

  return Math.ceil(base / 100) * 100;
}