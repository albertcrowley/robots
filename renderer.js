/**
 * Created by al on 9/12/2017.
 */

module.exports = {};

class Renderer {
    constructor(win) {
        this.window = win;
        console.log("got");
        console.log(win);
    };

    draw() {
        let canvas = this.window.document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(10, 20, 150, 75);
    }
};

module.exports.Renderer = Renderer;
