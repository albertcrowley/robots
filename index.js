let {Board} = require("./board.js");
let {Robot} = require("./robot.js");

// let keypress = require('keypress');
let term = require('terminal-kit').terminal;


let board = new Board(25, 25);

new Robot(board, 3, 3);
new Robot(board, 12, 6);


term.clear();
board.draw();


