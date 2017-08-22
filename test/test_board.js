
// let assert = require('assert');
let assert = require('chai').assert;
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
           new Robot(board, 2, 2);
           assert.equal(board.isPlayerCrushedByRobot(), false);
        });
        it('should return true if the player is in the same spot as a robot', function() {
            /** @type {Robot} */
            let robot = new Robot(board, board.player.x, board.player.y);
            board.addRobot(robot);
            assert.equal(board.isPlayerCrushedByRobot(), true, "The player was not crushed by a robot in his location.");
            // if player x is equal to robutt x and player y is equal to robutt y the player is killed
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


    describe('#setupBoard', function() {
        let board = new Board(25, 25);
        board.setupLevel(3);
        it('should add robots during setup', function() {
            let r = new Robot(new Board(10, 10));
            assert.instanceOf(r, Robot, "Is a robot really a robot?"); // test that I understand the chai library!
            assert.instanceOf(board.getRobots()[0], Robot, "There should only be robots in the robot array!");
        });
        it('should add a bunch of robots during setup', function() {
            // console.log ("num bots:");
            // console.log (board.robots);
            assert.isAbove(board.robots.length, 5, "There should be at least 5 robots after setting up level 3");
        });
        it('should have more robots in each level', function() {
            for (let i=2; i<10; i++) {
                for (let j=1; j < i; j++) {
                    assert.isAbove(board.robotsPerLevel(i), board.robotsPerLevel(j), 'There should be more robots in each higher level. This faild for level ' + j + ' and level ' + i);
                }
            }
        });

        it('should not put two robots in the same place when setting up the board', function() {
            let robots = board.getRobots();
            // let b = new Board(25, 25);
            // let robots = [
            //     new Robot(b, 4, 7),
            //     new Robot(b, 5, 7),
            //     new Robot(b, 6, 7),
            //     new Robot(b, 7, 8),
            //     new Robot(b, 4, 7),
            //     new Robot(b, 9, 9),
            //     new Robot(b, 4, 1),
            // ];
            for (let i=1; i < robots.length; i++) {
                for (let j=0; j < i; j++) {
                    let r1 = robots[i];
                    let r2 = robots[j];
                    assert.isNotOk(r1.getX() == r2.getX() && r1.getY() == r2.getY(),
                        'Two robots shouldn\'t have the same location on the board. There were two at (' + r1.getX() + ', ' + r1.getY() + ")" );
                }
            }
        });

        it('should clear old robots when setting up level', function() {
            let b = new Board(25, 25);
            let r = new Robot(b, 5, 5);
            r.tag = "tagme";
            b.setupLevel(3);
            let robots = b.getRobots();
            for (let i=0; i < robots.length; i++) {
                assert.notEqual(b.getRobots()[0].tag, "tagme", "It looks like one (or more) of the robots from the last level are stll there after setting up a new level.");
            }
        });
    });

    describe('#testTickActivites', function() {
       it('Should wreck robots in the same place', function() {
            let b = new Board(25, 25);
            new Robot(b, 5, 5); // 5,5
            new Robot(b, 6, 5);
            new Robot(b, 5, 6);
            new Robot(b, 5, 5); // 5,5
            new Robot(b, 7, 7);
            new Robot(b, 8, 8);
            new Robot(b, 9, 9);

            let r_count = b.getRobots().length;
            b.wreckRobots();
            assert.equal(b.getRobots().length, r_count - 2, 'wreckRobots() should remove any robots at the same location from the robots list.');
            assert.equal(b.getWrecks().length, 2, 'wreckRobots() should put all wrecked robots on the wrecked array');
       });

       it('Should stop the player from moving off the board', function() {
            let b = new Board(25, 30);
            b.player.x = 7; b.player.y= 29;
            b.movePlayer({'name': 'down'});
            assert.equal(b.player.y, 29, "The player moved over the top boundary of the board");

            b.player.x=0; b.player.y = 10;
            b.movePlayer({'name': 'left'});
            assert.equal(b.player.x, 0, "The player moved over the left boundary of the board");

            b.player.x = 20; b.player.y= 0;
            b.movePlayer({'name': 'up'});
            assert.equal(b.player.y, 0, "The player moved over the top boundary of the board");

            b.player.x = 24; b.player.y= 7;
            b.movePlayer({'name': 'right'});
            assert.equal(b.player.x, 24, "The player moved over the top boundary of the board");
       });
    });
});
