
export default function rule (state, character, next) {
  let applies = (currentState, input) => (currentState === state) && (character === input),
      follow = () => next,
      toString = () => `#<FARule ${state.toString()} --${character}--> ${next.toString()}>`

      return Object.freeze({
        applies,
        follow,
        toString,
      })
}
