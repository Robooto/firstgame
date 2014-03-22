var menu_state = {
    create: function () {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);
        // Defining variables
        var style = {
            font: "30px Arial",
            fill: "#ffffff"
        };
        var x = game.world.width / 2,
            y = game.world.height / 2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y - 50, "Touch to start", style);
        text.anchor.setTo(0.5, 0.5);

        // If the user already played
        if (score > 0) {
            // Display score
            var score_label = this.game.add.text(x, y + 50, "Last Score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5);
        }
        
        if (score > topScore) {
            topScore = score;
            var success = this.game.add.text(x, y - 100, "You beat your highscore!!", style);
            success.anchor.setTo(0.5, 0.5);
        }
        if ( topScore > 0) {
        var topScore_label = this.game.add.text(x, y + 100, "Top Score: " + topScore, style);
        topScore_label.anchor.setTo(0.5, 0.5);
        }
    },

    // Start the game
    start: function () {
        this.game.state.start('play');
    }
};