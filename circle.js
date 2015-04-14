/**
 * Created by Patryk on 2014-12-03.
 */

function Circle(r) { //circle prototype
    this.r = r;
    this.x = Math.floor(Math.random() * WIDTH);
    this.y = Math.floor(Math.random() * HEIGHT);
    this.dx = Math.floor(Math.random() * maxSpeed) + 1;
    this.dy = Math.floor(Math.random() * maxSpeed) + 1;
    this.color = getRandomColor();
    this.birthTime = new Date().getTime();

    this.checkPos = function() {
        if(this.x < this.r) {
            this.dx = this.dx * (-1);
            this.x = this.r;
        }
        if(this.x > (WIDTH - this.r) ) {
            this.dx = this.dx * (-1);
            this.x = WIDTH - this.r;
        }
        if(this.y < this.r) {
            this.dy = this.dy * (-1);
            this.y = this.r;
        }
        if(this.y > (HEIGHT - this.r)) {
            this.dy = this.dy * (-1);
            this.y = HEIGHT - this.r;
        }
    };

    this.repaint = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "black";
        c.stroke();
    };

    this.isCaught = function() {
        var diffX = playerX - this.x;
        var diffY = playerY - this.y;
        return diffX * diffX + diffY * diffY <= this.r * this.r;
    };
}