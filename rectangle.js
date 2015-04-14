/**
 * Created by Patryk on 2014-12-03.
 */

function Rectangle(w, h) { //Rectangle prototype
    this.w = w;
    this.h = h;
    this.x = Math.floor(Math.random() * WIDTH);
    this.y = Math.floor(Math.random() * HEIGHT);
    this.dx = Math.floor(Math.random() * maxSpeed) + 1;
    this.dy = Math.floor(Math.random() * maxSpeed) + 1;
    this.color = getRandomColor();
    this.birthTime = new Date().getTime();

    this.checkPos = function() {
        if(this.x < 0 ) {
            this.dx = this.dx * (-1);
            this.x = 0;
        }
        if(this.x > (WIDTH - this.w) ) {
            this.dx = this.dx * (-1);
            this.x = WIDTH - this.w;
        }
        if(this.y < 0) {
            this.dy = this.dy * (-1);
            this.y = 0;
        }
        if(this.y > (HEIGHT - this.h)) {
            this.dy = this.dy * (-1);
            this.y = HEIGHT - this.h;
        }
    };

    this.repaint = function() {
        c.fillRect(this.x, this.y, this.w, this.h);
        c.fillStyle = this.color;
    };

    this.isCaught = function() {
        return playerX < this.x + this.w && playerY < this.y + this.h &&
            playerX > this.x && playerY > this.y;
    };
}