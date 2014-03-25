// Initialize Phaser

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Our 'score' global variable
var score = 0;
var topScore = 0;
var style = { font: "30px Arial", fill: "#ffffff" };
// Define all the states
game.state.add('boot', boot_state);
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

// Start with the 'load' state
game.state.start('boot');
