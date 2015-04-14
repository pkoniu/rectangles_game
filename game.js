/**
 * Created by Patryk on 2014-11-28.
 */

var canvas, c, gameInterval, timeUpdaterInterval, checkgameTimeInterval,
    score, maxSpeed, minSize, maxSize, normal, hard, timeLeft=0,
    WIDTH = 1000, HEIGHT = 600,
    playerX, playerY,
    enemies = [];

var scores = [];

function setUpGame() {
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');
    score = 0;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.addEventListener("mousemove", mouseMovementHandler, false);
    askPlayer();
}

function mouseMovementHandler(mouseEvent) {
    playerX = mouseEvent.clientX - canvas.offsetLeft - 5;
    playerY = mouseEvent.clientY - canvas.offsetTop - 5;
}

function start() {
    var tmp;
    if(normal) tmp = 4;
    else if(hard) tmp = 6;
    else tmp = 2;
    for(var i=0; i<tmp; i++) {
       getNewFigure();
    }
    gameInterval = setInterval(loop, 10);
    timeUpdaterInterval = setInterval(updateTime, 1000);
    checkgameTimeInterval = setInterval(checkTime, 1000);
}

function loop() {
    update();
    draw();
}

function update() {
    var chaseTime;
    for(var i=0; i<enemies.length; i++) {
        if(enemies[i]) {
            enemies[i].x += enemies[i].dx;
            enemies[i].checkPos();
            enemies[i].y += enemies[i].dy;
            enemies[i].checkPos();

            if (enemies[i].isCaught()) {
                chaseTime = new Date().getTime() - enemies[i].birthTime;

                if(chaseTime < 1) //avoiding infinity as score
                    chaseTime = 1;

                score += Math.floor(1000/chaseTime) + Math.abs((enemies[i].dx + enemies[i].dy)/2);

                getNewFigure();

                delete enemies[i];
            }
        }
    }
}

function draw() {
    c.clearRect(0,0,WIDTH,HEIGHT);
    c.font = "18px Impact";
    c.textBaseline = "top";
    c.fillStyle = '#000000';
    c.fillText("Time left: " + timeLeft, 5, 5);
    c.fillText("Score: " + score, 5, 25);

    for(var i=0; i<enemies.length; i++) {
        if (enemies[i])
            enemies[i].repaint();
    }
}

function showResult() {
    for(var i=0; i<enemies.length; i++)
        delete enemies[i];

    c.clearRect(0,0,WIDTH,HEIGHT);
    alert("Your score: " + score);

    scores.push(score);
    sortScores();

    var topScoreList = document.querySelectorAll('p');
    for(i = 0; i < 3; i++) {
        if(scores[i]) {
            topScoreList[i + 1].innerHTML = (i+1).toString() + ". " + scores[i];
        }
    }

    score = 0;
    askPlayer();
}

function askPlayer() {
    $.prompt("Choose difficulty you want to begin with.", {
        title: "Are you Ready?",
        buttons: { "Easy": 0, "Normal": 1, "Hard": 2 },
        focus: 1,
        submit: function(e,v,m,f) {
            if(v===0) {
                changeDifficultyToEasy();
            } else if(v===1) {
                changeDifficultyToNormal();
            } else if(v===2) {
                changeDifficultyToHard();
            }
            start();
        }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getNewFigure() {
    var random = Math.floor(Math.random() * 2); //0 - Rect, 1 - Circle, 2 - square

    if(random===0) {
        var w = Math.floor(Math.random()*maxSize) + minSize;
        var h = Math.floor(Math.random()*maxSize) + minSize;
        enemies.push(new Rectangle(w, h));
    }
    if(random===1) {
        var r = Math.floor(Math.random()*maxSize) + minSize - 30;
        enemies.push(new Circle(r));
    } else if(random===2) {
        var a = Math.floor(Math.random()*maxSize) + minSize;
        enemies.push(new Rectangle(w, w));
    }
}

function sortScores(){
    scores.sort(function(a,b){
        return b-a;
    });
}

function updateTime() {
    timeLeft--;
}

function checkTime() {
    if (timeLeft <= 60 && normal === false) {
        changeDifficultyToNormal();
    }
    if(timeLeft <= 30 && hard === false) {
        changeDifficultyToHard();
    }
    if(timeLeft===0) {
        clearInterval(gameInterval);
        clearInterval(timeUpdaterInterval);
        clearInterval(checkgameTimeInterval);
        showResult();
    }
}

function changeDifficultyToEasy() {
    getNewFigure();
    normal = hard = false;
    timeLeft = 90;
    minSize = 65;
    maxSize = 75;
    maxSpeed = 3;
    document.body.style.background = "#3AC300";
}

function changeDifficultyToNormal() {
    getNewFigure();
    getNewFigure();
    normal = true;
    hard = false;
    timeLeft = 60;
    minSize = 50;
    maxSize = 55;
    maxSpeed = 6;
    for(var i=0; i<enemies.length; i++) {
        if(enemies[i]) {
            enemies[i].dx += 2;
            enemies[i].dy += 2;
        }
    }
    document.body.style.background = "#FFB600";
}

function changeDifficultyToHard() {
    getNewFigure();
    getNewFigure();
    getNewFigure();
    getNewFigure();
    hard = true;
    timeLeft = 30;
    minSize = 50;
    maxSize = 45;
    maxSpeed = 9;
    for(var i=0; i<enemies.length; i++) {
        if(enemies[i]) {
            enemies[i].dx += 3;
            enemies[i].dy += 3;
        }
    }
    document.body.style.background = "#E30000";
}

window.onload = setUpGame();