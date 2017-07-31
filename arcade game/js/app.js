
// Enemies the player must avoid
var Enemy = function(x, y) {
    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';
    //x and y initial start location
    this.x = x;
    this.y = y;
    //determining speed for enemy bugs
    this.speed = Math.floor((Math.random() * 350) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //keep the enemies running
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }

    //If the player comes too close to enemy reset game.
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            player.reset();
        }
    }
};

// Draw the enemy and player objects on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

// Draw the player objects on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset player to beginning position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};


//Update player position
Player.prototype.update = function(){
    //if left, right, up or down arrows is pressed more the player accordingly
    //unless the player is at the edge of the screen
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 50;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50;
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;

    //If the palyer reaches the water, reset player to start position
    if(this.y < 25){
        player.reset();
    }
};

//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};


// Determines number of enemies as well as their origin location
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-50, 50));
    allEnemies.push(new Enemy(-50, 130));
    allEnemies.push(new Enemy(-50, 230));
}());
//Instantiate player
var player = new Player();


// listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
