export const guesses = new Map();
export function setRealTxCount(blockHeight, realTxCount) {
  for (const [k, g] of guesses.entries()) {
    if (g.blockHeight === blockHeight) g.diff = Math.abs(g.guess - realTxCount);
  }
}
