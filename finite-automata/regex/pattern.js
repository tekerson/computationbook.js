export default {
  bracket: function (outerPrecedence) {
    if (this.precedence < outerPrecedence) {
      return "(" + this.toString() + ")";
    } else {
      return this.toString();
    }
  },
  matches: function (string) {
    return this.toNFADesign().accepts(string);
  },
};
