/* @flow */
/*::
  export type State = number|Symbol;

  export type Input = ?string; // really - ?char
  export type Inputs = string;

  export type Rule = {
    applies: (s:State, c:?string) => bool,
    follow: () => State,
    toString: () => string,
  };

  export type Rulebook = {
    rules: Array<Rule>,
    next: (s:Array<State>, i:string) => Array<State>,
    followFreeMoves: (s:Array<State>) => Array<State>,
  }

  export type FA = {
    isAccepting: () => bool,
    read: (i:string) => any,
    readString: (s:string) => any,
  };

  export type FADesign = {
    startState: State,
    acceptStates: Array<State>,
    rulebook: Rulebook,
    accepts: (i:Inputs) => bool,
    toFA: () => FA,
  };

  export type FAFactory = (s:Array<State>, a:Array<State>, r:Rulebook) => FA;

*/

export function design (fa/*: FAFactory*/, startState/*: State*/, acceptStates/*: Array<State>*/, rulebook/*: Rulebook*/)/* : FADesign */ {
  let toFA = () => fa([startState], acceptStates, rulebook),
      accepts = (string) => {
        let newFA = toFA();
        newFA.readString(string);
        return newFA.isAccepting();
      };

  return Object.freeze({
    startState,
    acceptStates,
    rulebook,
    accepts,
    toFA,
  });
}

export function rule (state/*: State*/, character/*: Input*/, next/*: State*/)/* : Rule */ {
  let applies = (currentState, input) => (currentState === state) && (character === input),
      follow = () => next,
      toString = () => `#<FARule ${state.toString()} --${character}--> ${next.toString()}>`;

  return Object.freeze({
    applies,
    follow,
    toString,
  });
}
