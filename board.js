console.log("in board");

module.exports = {};

class Board {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.data = new Array(x);
        for (let i=0; i < x; i++) {
            this.data[i] = new Array(y);
            for (let j=0; j < y; j++) {
                this.data[i][j] = 0;
            }
        }
        this.term = require('terminal-kit').terminal;
    }

    /**
     * @param {boolean} color
     */
    draw() {
        let term = this.term;
        term.moveTo(1, 1, "+");
        term.moveTo(this.x*2+2, 1, "+");
        term.moveTo(1, this.y+2, "+");
        term.moveTo(this.x*2+2, this.y+2, "+");
        for (let x=0; x<this.x; x++) {
            term.moveTo(2 + x*2, 1, "--");
            term.moveTo(2 + x*2, this.y + 2, "--");
        }
        for (let y=0; y<this.y; y++) {
            term.moveTo(1, y+2, "|");
            term.moveTo(this.x*2+2, y + 2, "|");
        }
        term.moveTo(1, this.y+2);
    }
}

module.exports.Board = Board;
