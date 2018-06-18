// Enemies our player must avoid
class Enemy{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y){
            this.x = x;
            this.y = y;
            this.sprite = 'images/enemy-bug.png';
            // randomly generated number between 0 and 300
            this.speed = Math.floor(Math.random() * 300)
        }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x >= 505) {
            this.x = -101
        }
        this.x += this.speed * dt;
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};


class Player {
    constructor(sprite = 'images/char-boy.png') {
        this.sprite = sprite;
        this.x = 202
        this.y = 374
    }

    update(){
        //TODO
    }

    handleInput(keyPressed) {
        if ((keyPressed === 'left') && (player.x > 0)) {
            player.x -= 101;
        } else if ((keyPressed === 'right') && (player.x < 404)) {
            player.x += 101;
        } else if ((keyPressed === 'up') && (player.y > 41)) {
            player.y -= 83;
        } else if ((keyPressed === 'down') && (player.y < 374)) {
            player.y += 83;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let i=0; i < 3; i++) {
    allEnemies.push(new Enemy(0, (i * 83) + 60));
}
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
