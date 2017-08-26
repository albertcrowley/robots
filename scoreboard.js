module.exports = {};

class ScoreBoard {
    
    constructor(level, moves, score, ypos, width) {
	this.level = level;
	this.moves = moves;
	this.score = score;
        this.term = require('terminal-kit').terminal;
        this.ypos = ypos || 28;
	this.width = width || 52;
    }

    draw() {
	let term = this.term;

	let s = " Score: " + this.score + "  Level: " + this.level + "  Moves: " + this.moves;
	let padding_length = this.width - s.length;
	for (let i=0; i< padding_length; i++) {
	    s += " ";
	}

	term.moveTo(1,this.ypos).bgCyan().black(s);
	term.bgBlack();
    }

}

module.exports.ScoreBoard = ScoreBoard;
