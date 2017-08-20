
let assert = require('assert');
let {Board} = require('../board.js');
let {Robot} = require('../robot.js');

describe('Board', function() {
    describe('#isPlayerCrushedByRobot()', function() {
        /** @type {Board} */
        board = new Board(25, 25);
        it('should return false when no robots have been added', function() {
            assert.equal(board.isPlayerCrushedByRobot(), false);
        });
        it('should return false if no robot is in the same spot as the player', function() {
           /** @type {Robot} */
           let robot = new Robot(board, 2, 2);
           board.addRobot(robot);
           assert.equal(board.isPlayerCrushedByRobot(), false);
        });
        it('should return true if the player is in the same spot as a robot', function() {
            /** @type {Robot} */
            let robot = new Robot(board, board.player.x, board.player.y);
            board.addRobot(robot);
            assert.equal(board.isPlayerCrushedByRobot(), true);
        });
        it('should return true if the player is in the same spot as a robot (more robots)', function() {
            let board = new Board(25, 25);
            for (let i=0; i<20; i++) {
                /** @type {Robot} */
                let robot = new Robot(board, 1, i);
                board.addRobot(robot);
            }
            let robot = new Robot(board, board.player.x, board.player.y);
            board.addRobot(robot);
            for (let i=0; i<20; i++) {
                /** @type {Robot} */
                let robot = new Robot(board, 2, i);
                board.addRobot(robot);
            }

            assert.equal(board.isPlayerCrushedByRobot(), true);
        });
        it('should return false if the player doesn\'t share spot as a robot (more robots)', function() {
            let board = new Board(25, 25);
            for (let i=0; i<20; i++) {
                /** @type {Robot} */
                let robot = new Robot(board, 1, i);
                board.addRobot(robot);
            }
            for (let i=0; i<20; i++) {
                /** @type {Robot} */
                let robot = new Robot(board, 2, i);
                board.addRobot(robot);
            }

            assert.equal(board.isPlayerCrushedByRobot(), false);
        });

    });

});
