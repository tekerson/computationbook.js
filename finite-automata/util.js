import { not, contains } from 'ramda';

export function isSubset (sub, sup) {
  return sub.filter(el => not(contains(el, sup))).length === 0;
}
