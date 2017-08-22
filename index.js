let {Board} = require("./board.js");
let {Robot} = require("./robot.js");

let keypress = require('keypress');
let term = require('terminal-kit').terminal;


let board = new Board(25, 25);

// sample robots
new Robot(board, 2, 5);
new Robot(board, 14, 8);
new Robot(board, 4, 20);
new Robot(board, 3, 3);
new Robot(board, 12, 6);


term.clear();
board.draw();

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
    // console.log('got "keypress"', key);
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
    board.tick(key);
});

process.stdin.setRawMode(true);
process.stdin.resume();


