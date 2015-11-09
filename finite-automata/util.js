
export function flatMap (arr, f) {
  return Array.prototype.concat(...arr.map(f));
}
