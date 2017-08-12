
let keypress = require('keypress');
let term = require('terminal-kit').terminal;

class Board {
    constructor() {
        this.id = 7;
    }

    /**
     * @param {boolean} color
     */
    draw(color) {
        console.log("drawing.");
    }
}

let board = new Board();


term.clear();
term.red('red text');

term.moveTo(3, 6, 'placed text');

term.moveTo.green(20, 2, 'The screen size is %d by %d.', term.width, term.height);

term.moveTo(0, 25, 'the id is: %d', board.id);
board.draw();


