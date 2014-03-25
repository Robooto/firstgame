// Loads all my info
// boot state loads loading screen

var boot_state = {
    preload: function () {
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('loading', 'assets/loading.png');
        this.game.load.image('loading2', 'assets/loading2.png');
    },
    create: function () {
        // start load state
        this.game.state.start('load');
    }
};
        
var load_state = {
    preload: function () {
    var loading_label = this.add.text(game.world.centerX, game.world.centerY, 'loading...', { font: '30px Arial', fill: '#fff' });
        loading_label.anchor.setTo(0.5, 0.5);
        
        this.game.load.image('line', 'assets/line.png');
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.audio('jump', 'assets/jump.wav');
    },
    
    create: function () {
        // When things are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};