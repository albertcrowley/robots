
module.exports = {};


class Board {
    /**
     * Create a new robot at X, Y
     *
     * @param {int} width of the board
     * @param {int} height of the board
     * @param {function} callback to call when the board is initialized
     */
    constructor(width, height, callback) {
        this.x = width;
        this.y = height;
        this.callback = callback;
        this.data = new Array(this.x);
        for (let i = 0; i < this.x; i++) {
            this.data[i] = new Array(this.y);
            for (let j = 0; j < this.y; j++) {
                this.data[i][j] = 0;
            }
        }
        /** @var {Array.Robot} this.robots */
        this.robots = [];
        this.wrecks = [];
        this.player = {};
        this.player.x = Math.floor(this.x / 2);
        this.player.y = Math.floor(this.y / 2);
        this.player.glyph = "&";
        this.term = require('terminal-kit').terminal;

        this.horizontal = "+";
        this.field = "";
        for (let i = 0; i < width; i++) {
            this.horizontal += "--";
            this.field += ". ";
        }
        this.horizontal += "+";

        let {ScoreBoard} = require('./scoreboard.js');
        this.scoreboard = new ScoreBoard(1, 0, 0);

        if (process.versions['electron']) {
            this.electron = true;

            this.robot_img = new Image();
            this.robot_img.src = "./resources/robot.svg";
            this.robot_img.onload = () => {this.ready(); };

            this.trash_img = new Image();
            this.trash_img.src = "./resources/recycle-bin.svg";
            this.trash_img.onload = () => {this.ready(); };

            this.player_img = new Image();
            this.player_img.src = "./resources/player-walking.svg";
            this.player_img.onload = () => {this.ready();};

        } else {
            this.electron = false;
        }
    }

    /**
     * Returns true when the board is ready to work
     *
     * @returns {boolean}
     */
    ready() {
        if (( this.robot_img.height > 0 ) && ( this.player_img.height > 0 ) && ( this.trash_img.height > 0 ) ) {
            this.callback();
        }
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
        switch (key.name || key) { // if the name is null, use the key itself. Helps with electron vs terminal processing
            case "right":
            case "ArrowRight":
                this.player.x++;
                break;
            case "left":
            case "ArrowLeft":
                this.player.x--;
                break;
            case "down":
            case "ArrowDown":
                this.player.y++;
                break;
            case "up":
            case "ArrowUp":
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

    drawInElectron(canvas) {
        if (! canvas) {
            canvas = window.document.getElementById("canvas");
        }
        let ctx = canvas.getContext("2d");

        // clear
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.rect(0, 0, 500, 500);
        ctx.fill();
        ctx.stroke();

        // board
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 500);
        ctx.lineTo(500, 500);
        ctx.lineTo(500, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // robots
        for (let i=0; i < this.robots.length; i++) {
            let rx = this.robots[i].getX() * 20;
            let ry = this.robots[i].getY() * 20;
            if (this.robot_img) {
                ctx.drawImage(this.robot_img, rx, ry, 20, 20);
            } else {
                ctx.beginPath();
                ctx.fillStyle = "#ff0000";
                ctx.strokeStyle = "#ff0000";
                ctx.arc(rx, ry, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // player
        let px = this.player.x * 20;
        let py = this.player.y * 20;
        if (this.player.glyph == "X") {
            ctx.beginPath();
            ctx.fillStyle = "#00ff00";
            ctx.strokeStyle = "#00ff00";
            ctx.arc(px * 20, py, 10, 0, Math.PI /4);
            ctx.arc(px * 20, py, 10, Math.PI, Math.PI * 5/4);
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.drawImage(this.player_img, px, py, 20, 20);
        }
    }

    /**
     * @param {boolean} color
     */
    draw(canvas) {
        if (process.versions['electron']) {
            return this.drawInElectron(canvas);
        }

        let term = this.term;
        term.bgBlack();
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


	this.scoreboard.draw();

        term.moveTo(1, this.y+2);

	
    }
}

module.exports.Board = Board;
