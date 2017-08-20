let {Board} = require("./board.js");

// let keypress = require('keypress');
let term = require('terminal-kit').terminal;


let board = new Board(25, 25);


term.clear();
board.draw();


