
export function flatMap (arr, f) {
  return Array.prototype.concat(...arr.map(f));
}

export function uniq (arr) {
  return Array.from(new Set(arr));
}

export function isSubset (sub, sup) {
  return sub.filter((el) => sup.indexOf(el) === -1).length === 0;
}
