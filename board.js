
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
        this.robots = [];
        this.player = {};
        this.player.x = Math.floor(x/2);
        this.player.y = Math.floor(y/2);
        this.term = require('terminal-kit').terminal;
    }

    /**
     * Adds a robot to the internal Board robot array
     * @param {Robot} robot
     */
    addRobot(robot) {
        this.robots.push(robot);
    }

    /**
     * If there is a robot in the same x,y as this.player, return true
     * Otherwise return false
     *
     * @return {boolean}
     */
    isPlayerCrushedByRobot() {
        return false;
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
