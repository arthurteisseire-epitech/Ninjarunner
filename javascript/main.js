var game = new Phaser.Game(900, 506);
var player;
var bg;
var bgv;
var layer;
var shuriken = 0;
var score = 0;
var scoreText;

var ninja = {
    preload: function () {
        //Chargement des images
        game.load.image('sol', 'assets/images/herbe.png');
        game.load.image('ciel', 'assets/images/ciel.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.spritesheet('anim', 'assets/sprites/anim.png', 150, 139, 60);
    },

    create: function () {
        //Setup du jeu + affichage

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'ciel');
        game.physics.arcade.gravity.y = 1200;

        bg = game.add.tileSprite(0, 385, 900, 156, 'sol');
        bgv = -5;

        shuriken = game.add.tileSprite(900, 290, 32, 32, 'shuriken');


        this.player = game.add.sprite(300, 370, 'anim');
        this.player.anchor.set(0.5);
        game.physics.arcade.enable(this.player);

        var animrun = this.player.animations.add('animrun', [0,1,2,3,4,5,6,7,8,9]);
        var animglisse = this.player.animations.add('animglisse', [10,11,12,13,14,15,16,17,18,19]);
        var animsaut = this.player.animations.add('animsaut', [20,21,22,23,24,25,26,27,28,29]);
        var animattaque = this.player.animations.add('animattaque', [30,31,32,33,34,35,36,37,38,39]);
        var animsautattaque = this.player.animations.add('animsautattaque', [40,41,42,43,44,45,46,47,48,49]);
        var animmort = this.player.animations.add('animmort', [50,51,52,53,54,55,56,57,58,59]);

        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(800, 105, 20, 110);


        this.cursors= game.input.keyboard.createCursorKeys();

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '26px', fill: '#000' });
    },
    update: function () {
        //Animations du jeu

        this.player.body.velocity.x = 0;
        this.player.body.gravity.y = 500;

        if (this.cursors.left.isDown && this.player.body.onFloor()) {
            this.player.animations.play('animmort', 10, false);
        }

        else if (this.cursors.right.isDown && this.player.body.onFloor()) {
            this.player.animations.play('animattaque', 20, false);
            this.player.body.setSize(800, 105, 20, 110);
        }
        else if(this.player.body.onFloor()) {
            this.player.animations.play('animrun', 10, true);
            this.player.body.setSize(800, 105, 20, 110);
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.body.setSize(800, 105, 20, 110);
                this.player.body.velocity.y = -600;
                this.player.animations.play('animsaut', 10, false);
                score += 10;
                scoreText.text = 'Score: ' + score;
        }

        if (this.cursors.up.isDown && this.cursors.right.isDown && this.player.body.onFloor()) {
            this.player.body.setSize(800, 105, 20, 110);
            this.player.body.velocity.y = -600;
            this.player.animations.play('animsautattaque', 20, false);
            score += 10;
            scoreText.text = 'Score: ' + score;
        }


        if (this.cursors.down.isDown && this.player.body.onFloor()) {
            this.player.body.gravity.y = 100000;
            this.player.body.setSize(800, 50, 20, 110);
            this.player.body.velocity.y = -100;
            this.player.animations.play('animglisse', 50, false);
        }

        bg.tilePosition.x += bgv;
        if (launchShuriken() == true && shuriken.x < -32)
        {
            shuriken = game.add.tileSprite(900, 290, 32, 32, 'shuriken');
        }
        shuriken -= 5;

        // Phase de test pour la collision
        game.physics.arcade.collide (player, shuriken, this.test);


    }
};

var menu = {
    preload: function () {
        // On charge les images
        game.load.image('sol', 'assets/images/herbe.png');
        game.load.image('player', 'assets/images/accueil.png');
        game.load.image('ciel', 'assets/images/ciel.png');
    },
    create: function () {
        // On ajoute les images pour le menu
        game.add.sprite(0, 0, 'ciel');
        bg = game.add.tileSprite(0, 385, 900, 156, 'sol');
        this.player = game.add.sprite(150, 210, 'player');

        //On insère du texte
        var text = game.add.text(80, 80, 'NinjaRunner', {font: '50px Arial', fill:'#000000'});
        var text2 = game.add.text(80, game.world.height-350, 'Appuyer sur ENTRER pour commencer !', {font: '25px Arial', fill:'#000000'});

        // On lui demande d'appuyer sur une touche (Entrer)1
        var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key.onDown.addOnce(this.start, this);
    },
    start: function () {
        game.state.start('ninja');
    }
};



function test () {
    console.log('toto');
}

// Phase de test pour GameOver
function gameOver()
{
    this.player.animations.play('animmort', 10, false);
    mort = true;
    game.add.text(80, game.world.height-350, 'Vous êtes mort 😞 Votre score est de '+score+' points !', {font: '35px Arial', fill:'#000000'});
    game.add.text(160, game.world.height-80, 'Appuyez sur F5 pour rejouer !', {font: '35px Arial', fill:'#000000'});
    scoreText.destroy();


    var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key.onDown.addOnce(this.start, this);
}
// Fin du test GameOver

var interframe = 0, limitInterframe = Math.floor(Math.random()*400 + 50);
function launchShuriken (){
    interframe +=1;
    if (interframe > limitInterframe){
        interframe = 0;
        limitInterframe = Math.floor(Math.random()*400 + 50);
        return true;
    }
    return false;
}



game.state.add('ninja', ninja);
game.state.add('menu', menu);

game.state.start('menu');
