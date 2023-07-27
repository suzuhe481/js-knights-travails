// Piece
// Used to create non-binary tree that tracks a piece and their next move.
const Piece = (pos) => {
  var nextPos = [];

  return { pos: pos, nextPos, parent: null };
};

export { Piece };
