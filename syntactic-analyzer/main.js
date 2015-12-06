import lexicalAnalyzer from "../lexical-analyzer";

import syntacticAnalyzer from ".";

let valid = lexicalAnalyzer("while ( x < 3 ) { x = x * 2 }").analyze().join('');
let invalid = lexicalAnalyzer("while ( x < 5 x = x * }").analyze().join('');

console.log(syntacticAnalyzer.accepts(valid));
console.log(!syntacticAnalyzer.accepts(invalid));
