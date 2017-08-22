
module.exports = {};

class Board {
    /**
     * Create a new robot at X, Y
     *
     * @param {int} width of the board
     * @param {int} height of the board
     */
    constructor(width, height) {
        this.x = width;
        this.y = height;
        this.data = new Array(this.x);
        for (let i=0; i < this.x; i++) {
            this.data[i] = new Array(this.y);
            for (let j=0; j < this.y; j++) {
                this.data[i][j] = 0;
            }
        }
        /** @var {Array.Robot} this.robots */
        this.robots = [];
        this.wrecks = [];
        this.player = {};
        this.player.x = Math.floor(this.x/2);
        this.player.y = Math.floor(this.y/2);
        this.player.glyph = "&";
        this.term = require('terminal-kit').terminal;

        this.horizontal = "+";
        this.field = "";
        for (let i=0; i< width; i++) {
            this.horizontal += "--";
            this.field += ". ";
        }
        this.horizontal += "+";
    }

    /**
     * Returns the expected number of robots for the level.
     * Higher levels will always have more robots
     * @param {int} level
     * @return {int}
     */
    robotsPerLevel(level) {
        return (level*2+1);
    }

    /**
     * Run all the setup for a new level.
     * Clear out any old robots and wrecks.
     * Create a new set of robots
     * Move the player back to the middle
     * @param {int} level
     */
    setupLevel(level) {
        this.robots.push(level); // totally wrong!!!
    }


    /**
     * Adds a robot to the internal Board robot array
     * @param {Robot} robot
     */
    addRobot(robot) {
        // console.log ("adding robot");
        // console.log (this.robots);
        this.robots.push(robot);
    }

    /**
     * Returns the array of robots on the board
     *
     * @return {Robot[]}
     */
    getRobots() {
        return this.robots;
    }

    /**
     * Returns the array of wrecks
     * @return {Robot[]}
     */
    getWrecks() {
        return this.wrecks;
    }

    /**
     * If there is a robot in the same x,y as this.player, return true
     * Otherwise return false
     *
     * @return {boolean}
     */
    isPlayerCrushedByRobot() {
        // if player x = robutt x and player y = robutt y, player is squashed
        // do it in a loop that checks for each robutt
        // make sure that you are not getting a x value from one robutt and a y value from another robutt
        let robutts = this.getRobots();
        for (let i =0; i < robutts.length; i++) {
            let r = robutts[i];
            if (this.player.x == r.x) {
                if (this.player.y == r.y) {
                    return true;
                }
            }
        }
        return false;
    }

    // samePlace(a,b) {
    //     if (a.x == b.x && a.y == b.y) {
    //         return true;
    //     }
    //     return false;
    // }

    /**
     * Run one tick of the game
     *
     * @param {keypress} key
     */
    tick(key) {
        this.movePlayer(key);
        this.moveRobots();
        this.wreckRobots();
        if (this.isPlayerCrushedByRobot()) {
            this.playerCrushed();
        }
        this.draw();
    }

    /**
     * Moves the player
     * @param {keypress} key
     */
    movePlayer(key) {
        switch (key.name) {
            case "right":
                this.player.x++;
                break;
            case "left":
                this.player.x--;
                break;
            case "down":
                this.player.y++;
                break;
            case "up":
                this.player.y--;
                break;
        };
    }

    playerCrushed() {
        this.player.glyph = "X";
    }

    moveRobots() {

    }

    /**
     * If two robots are in the same place, remove them
     * from the robots array and add them to the
     * wreck array.
     */
    wreckRobots() {

    }

    /**
     * @param {boolean} color
     */
    draw() {
        let term = this.term;
        term.moveTo(1, 1, this.horizontal);
        term.moveTo(1, this.y+2, this.horizontal);
        for (let y=0; y<this.y; y++) {
            term.moveTo(1, y+2, "|");
            term.moveTo(this.x*2+2, y + 2, "|");
        }
        for (let y=0; y < this.y; y++) {
            term.moveTo(2, 2+y, this.field);
        }

        // console.log("robots " + this.robots.length);
        for (let i=0; i < this.robots.length; i++) {
            let rx = this.robots[i].getX();
            let ry = this.robots[i].getY();
            // console.log("x is " + rx + " and y is " + ry);
            term.moveTo(2+rx*2, 2+ry).brightRed("#");
        }

        term.moveTo(2+ this.player.x *2, 2 + this.player.y).brightGreen(this.player.glyph);

        term.moveTo(1, this.y+2);
    }
}

module.exports.Board = Board;
