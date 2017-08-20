
module.exports = {};

class Robot {
    /**
     *
     * @param {Board} board
     * @param {int} x initial x position of robot
     * @param {int}y initial y position of robot
     */
    constructor(board, x, y) {
        this.board = board;
        this.x = x || Math.floor(Math.random(0, board.x));
        this.y = y || Math.floor(Math.random(board.y));
    }

    /**
     * Moves the robot one square towards the player
     */
    move() {

    }


}

module.exports.Robot = Robot;
