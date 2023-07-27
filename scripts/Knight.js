import { Board } from "./Board.js";
import { Piece } from "./Piece.js";

const Knight = () => {
  // Takes in 2 arrays.
  // A start and end position.
  // Returns an array of the path needed to get from start to end.
  const knightsTravails = (start, end) => {
    // Returns null if either start or end are not valid positions.
    if (!Board().validPosOnBoard(start) || !Board().validPosOnBoard(end)) {
      console.log("1 or more positions given are not valid");
      return null;
    }

    // Initial starting knight
    var startingKnight = Piece(start);

    // Keeps track of knights remaining
    var knightQueue = [];
    knightQueue.push(startingKnight);

    // Keeps track of the positions visited
    var visitedPositions = [];

    // Goes until knightQueue is empty, or the end position is reached.
    while (knightQueue.length !== 0) {
      // Get a knight
      var currKnight = knightQueue.shift();

      // Calculate all moves for current knight.
      var possibleMoves = nextMoves(currKnight.pos);

      // Removes possible moves that were already visited.
      possibleMoves = removeVisitedFromNext(visitedPositions, possibleMoves);

      // Create array of new pieces of the next possible moves.
      var nextPiecesArr = [];
      for (var i = 0; i < possibleMoves.length; i++) {
        var nextPiece = Piece(possibleMoves[i]);

        // Assigns the parent of the nextPiece
        nextPiece.parent = currKnight;
        nextPiecesArr.push(nextPiece);
      }

      // Set the currKnight's next positions to the array of next pieces
      currKnight.nextPos = nextPiecesArr;

      // Append each new piece to knightQueue and visitedPositions
      // Create new pieces, given them positions,
      // And append them to knightQueue and visitedPositions
      nextPiecesArr.forEach((nextPiece) => {
        knightQueue.push(nextPiece);
        visitedPositions.push(nextPiece);
      });

      // Gets the end Position if it was visited
      var endPiece = getEndPiece(end, nextPiecesArr);

      // If a valid end position was visited, break out of while loop.
      // endPiece === an empty array if the end wasn't reached.
      // If it was a nonzero length, end wasa reached.
      if (endPiece.length !== 0) {
        break;
      }

      // End of while loop
    }

    // Gets the path from the end piece by following it's parent to the end.
    // Path is from end -> start.
    var pathToStart = [];
    pathToStart.push(endPiece.pos);
    while (endPiece.parent !== null) {
      pathToStart.push(endPiece.parent.pos);

      endPiece = endPiece.parent;
    }

    // Reverse the path
    var pathToEnd = pathToStart.reverse();

    return pathToEnd;
  };

  // Helper function
  // Returns an array of all possible moves from a given position.
  const nextMoves = (pos) => {
    var allMoves = [];
    const xPos = pos[0];
    const yPos = pos[1];

    // Gets all possible moves for current knight's position.
    // Both valid and invalid.
    allMoves.push([intToChar(charToInt(xPos) + 1), yPos + 2]);
    allMoves.push([intToChar(charToInt(xPos) + 1), yPos - 2]);
    allMoves.push([intToChar(charToInt(xPos) - 1), yPos - 2]);
    allMoves.push([intToChar(charToInt(xPos) - 1), yPos + 2]);
    allMoves.push([intToChar(charToInt(xPos) + 2), yPos + 1]);
    allMoves.push([intToChar(charToInt(xPos) + 2), yPos - 1]);
    allMoves.push([intToChar(charToInt(xPos) - 2), yPos - 1]);
    allMoves.push([intToChar(charToInt(xPos) - 2), yPos + 1]);

    // Filters out the nonvalid moves.
    var possibleMoves = allMoves.filter((move) =>
      Board().validPosOnBoard(move)
    );

    return possibleMoves;
  };

  // Helper function
  // Converts a character to it's ASCII number.
  // Should only accept a single character.
  const charToInt = (char) => {
    return char.charCodeAt(0);
  };

  // Helper function
  // Converts an ASCII number to a character.
  // Should only accept a single integer.
  const intToChar = (int) => {
    return String.fromCharCode(int);
  };

  // Helper function
  // Takes in 2 arrays of moves.
  // Removes the values of visited from next and returns an array of the remaining moves.
  const removeVisitedFromNext = (visited, next) => {
    var visitedRemoved = next.filter(
      (nextMove) => !visited.some((visitedMove) => nextMove === visitedMove)
    );

    return visitedRemoved;
  };

  // Helper function
  // Returns true if the end position has been visited by the next pieces.
  // Returns false otherwise.
  const getEndPiece = (end, nextPiecesArr) => {
    for (var i = 0; i < nextPiecesArr.length; i++) {
      if (nextPiecesArr[i].pos.toString() === end.toString()) {
        return nextPiecesArr[i];
      }
    }

    return [];
  };

  return { knightsTravails };
};

export { Knight };
