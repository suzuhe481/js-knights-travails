import { Game } from "./Game.js";
import { Board } from "./Board.js";
import { Knight } from "./Knight.js";

var k = Knight();

const letterChoices = "abcdefgh";
const numOfMoves = 10;

// Creates an array of random valid letters. a-h
var randomLetters = [];
for (var i = 0; i < numOfMoves; i++) {
  var letter = letterChoices[Math.floor(Math.random() * letterChoices.length)];
  randomLetters.push(letter);
}

// Creates an array of random valid numbers.
var randomNumbers = [];
for (var i = 0; i < numOfMoves; i++) {
  var num = Math.floor(Math.random() * 8) + 1;
  randomNumbers.push(num);
}

// Combines randomLetters and RandomNumbers
var randomMoves = [];
for (var i = 0; i < numOfMoves; i++) {
  var newMove = [];
  newMove.push(randomLetters[i]);
  newMove.push(randomNumbers[i]);

  randomMoves.push(newMove);
}

// Calculating and printing paths
for (var i = 0; i < numOfMoves; i += 2) {
  var start = randomMoves[i];
  var end = randomMoves[i + 1];
  var result = k.knightsTravails(start, end);

  var path = "";
  console.log(
    "Path from (",
    start.toString().toUpperCase(),
    ") to (",
    end.toString().toUpperCase(),
    ")"
  );

  result.forEach(function (pos, index) {
    var p = pos.toString().toUpperCase();

    if (index === result.length - 1) {
      path = path.concat("(", p, ")");
    } else {
      path = path.concat("(", p, ") -> ");
    }
  });

  console.log(path);
  console.log("\n");
}
