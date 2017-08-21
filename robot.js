
module.exports = {};

class Robot {
    /**
     * Create a robot at (X,Y)
     * @param {Board} board
     * @param {int} x initial x position of robot
     * @param {int}y initial y position of robot
     */
    constructor(board, x, y) {
        this.board = board;
        this.x = x || Math.floor(Math.random(0, board.x));
        this.y = y || Math.floor(Math.random(board.y));
        board.addRobot(this);
    }

    /**
     * Moves the robot one square towards the player
     */
    move() {

    }

    /**
     * Returns the robot X
     *
     * @return {int|number|*}
     */
    getX() {
        return this.x;
    }

    /**
     * Returns the robot Y
     * @return {int|number|*}
     */
    getY() {
        return this.y;
    }

}

module.exports.Robot = Robot;
