'use strict';

let rowStep = 101;
let columnStep = 83;
let player_x_start = 202;
let player_y_start = 392;
let allEnemies = [];

class Character {
    constructor(x, y, sprite) {
            this.x = x;
            this.y = y;
            this.sprite = sprite
        }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y) {
            super(x, y, 'images/enemy-bug.png');
            // randomly generated number between 0 and 300
            this.speed = Math.floor(Math.random() * 300);
        }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x >= rowStep * 5) {
            this.x = -rowStep;
        }
        this.x += this.speed * dt;
        // check for collisions with player
        if ((this.y === player.y) && (player.x - rowStep / 2 <= this.x) && (this.x <= player.x + rowStep / 2)) {
            player.reset();
        }
    }

    reset() {
        this.x = player_x_start;
        this.y = player_y_start;
    }
}


class Player extends Character {
    constructor(sprite = 'images/char-boy.png') {
        super(player_x_start, player_y_start, sprite);
    }

    update() {
        if (this.y === -23) {
            setTimeout( () => {
                alert("You won!");
                this.reset();
                resetEnemies();
            }, 10);
        }
    }

    reset() {
        this.x = player_x_start;
        this.y = player_y_start;
    }

    handleInput(keyPressed) {
        if ((keyPressed === 'left') && (player.x > 0)) {
            player.x -= rowStep;
        } else if ((keyPressed === 'right') && (player.x < rowStep * 4)) {
            player.x += rowStep;
        } else if ((keyPressed === 'up') && (player.y > columnStep / 2)) {
            player.y -= columnStep;
        } else if ((keyPressed === 'down') && (player.y < columnStep * 4)) {
            player.y += columnStep;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
function resetEnemies() {
    allEnemies = [];
    for (let i=0; i < 3; i++) {
        allEnemies.push(new Enemy(0, (i * columnStep) + 60));
    }
}

resetEnemies();
// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
