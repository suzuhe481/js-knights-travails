const Board = () => {
  // Given a position.
  // Returns true if position if valid.
  // Returns false otherwise.
  // Pos is an array of 2 elements.
  // pos[0] = Single character
  // pos[1] = Single integer
  const validPosOnBoard = (pos) => {
    const xPosRegEx = "^[A-H]$";
    const yPosRegEx = "^[1-8]$";

    const xPos = pos[0].toUpperCase();
    const yPos = pos[1].toString();

    if (xPos.match(xPosRegEx) && yPos.match(yPosRegEx)) {
      return true;
    }

    return false;
  };

  return { validPosOnBoard };
};

export { Board };
