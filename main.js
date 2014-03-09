// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');


// Creates a new 'main' state that wil contain the game

var main_state = {

    preload: function () {
        // Function called first to load all the assets
        // Change background color
        this.game.stage.backgroundColor = '#71c5cf';

        // Load the bird in
        this.game.load.image('bird', 'assets/bird.png');

        // load in the pipes
        this.game.load.image('pipe', 'assets/pipe.png');
        
        // load sound
        this.game.load.audio('jump', 'assets/jump.wav');

    },

    create: function () {
        // Fuction called after 'preload' to setup the game 

        // Display bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Add gravity to the bird so it will fall

        this.bird.body.gravity.y = 1000;

        // Creating a 'jump' function that is called from spacebar

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        space_key.onDown.add(this.jump, this);

        // Create a group of pipes - phaser groups are for multiple of the same objects
        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');

        // Adding pipes in the game.  Looping every 1.5 seconds
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
        
        // Add score
        this.score = -1;
        // adding some style to score board
        var style = { font: "30px Arial", fill: "#ffffff" };
        // adding score to game
        this.label_score = this.game.add.text(20, 20, "0", style);
        
        //anchor point to bird
        this.bird.anchor.setTo(-0.2, 0.5);
        
        //add jump sound
        this.jump_sound = this.game.add.audio('jump');
                     
    },

    update: function () {
        // Function called 60 times per second

        // If the bird gets out of the world restart the game function

        if (this.bird.inWorld == false)
            this.restart_game();
        
        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
        // roate the bird downward up to a certain point
        if(this.bird.angle < 20)
            this.bird.angle += 1;
    },

    // Jump function
    jump: function () {
         // don't jump when dead
        if (this.bird.alive == false)
            return;
        // Add vertical velocity to bird (jump)
        this.bird.body.velocity.y = -350;
        
        //animation on jump
        var animation = this.game.add.tween(this.bird);
        
        // animate the angle of the bird over 100 milliseconds
        animation.to({angle: -20}, 100);
        
        animation.start();
        
       
        
        this.jump_sound.play();
        
    },

    restart_game: function () {
        // start the main state restarting the game
        this.game.state.start('main');

        // restart the timer on the pipe wall on restart
        this.game.time.events.remove(this.timer);
    },

    // Pipe function so we are destorying them as needed

    add_one_pipe: function (x, y) {
        // Get the first pipe out of the group
        var pipe = this.pipes.getFirstDead();

        // Set the new postion of the pipe
        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left

        pipe.body.velocity.x = -200;

        //Kill the bit when it's no longer visble
        pipe.outOfBoundsKill = true;
        
    },

    // Create rows of pipes

    add_row_of_pipes: function () {
        //creating hole for bird
        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.add_one_pipe(400, i * 60 + 10);
        
        // adding to score when pipes are created
        this.score += 1;
        this.label_score.content = this.score;
    },
    
    hit_pipe: function () {
        
        // If the bird has already hit a pipe, stop
        if (this.bird.alive == false)
            return;
        
        // Set the alive property of the bird to false
        this.bird.alive = false;
        
        // Stop pipes from appearing when dead
        this.game.time.events.remove(this.timer);
        
        //Go through all the pipes, and stop their movement
        
        this.pipes.forEachAlive (function (p) {
            p.body.velocity.x = 0;
        }, this);
        
    },
        




};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');