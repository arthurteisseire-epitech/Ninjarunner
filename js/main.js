var game = new Phaser.Game(900, 506);
var player;
var bg;
var bgv;
var layer;
var score = 0;
var scoreText;
var ninja = {
    preload: function () {
        //Chargement des images
        game.load.image('sol', 'assets/herbe.png');
        game.load.image('player', 'assets/player.png');
        game.load.image('ciel', 'assets/ciel.png');


    },
    create: function () {
        //Setup du jeu + affichage

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'ciel');
        game.physics.arcade.gravity.y = 1200;

        bg = game.add.tileSprite(0, 385, 900, 156, 'sol');
        bgv = -5;

        this.player = game.add.sprite(150, 370, 'player' );
        this.player.anchor.set(0.5);
        game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(800, 32, 5, 120);

        this.cursors= game.input.keyboard.createCursorKeys();

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '26px', fill: '#000' });
    },
    update: function () {
        //Animations du jeu

        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -400;
            score += 10;
            scoreText.text = 'Score: ' + score;
        }

       bg.tilePosition.x += bgv;

    }
};

game.state.add('ninja', ninja);
game.state.start('ninja');
