var game = new Phaser.Game(900, 506);
var player;
var mort = false;
var playerEstAuSol = false;
var sol;
var solV = -5;
var shuriken;
var score = 0;
var compteur = 0;

var ninja = {
    preload: function () {
        game.load.image('sol', 'assets/images/herbe.png');
        game.load.image('ciel', 'assets/images/ciel.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //On créer le ciel qui sert de background
        game.add.sprite(0, 0, 'ciel');


        //On créer le sol
        sol = game.add.tileSprite(0, 400, 900, 120, 'sol');
        game.physics.enable(sol, Phaser.Physics.ARCADE);
        sol.body.allowGravity = false;
        sol.body.collideWorldBounds = true;
        sol.body.immovable = true;


        //On créer le joueur
        player = game.add.sprite(300, 320, 'player');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.immovable = true;
        player.body.gravity.y = 0;

        //On créer le shuriken
        shuriken = game.add.sprite(900, 270,'shuriken');
        game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
        shuriken.body.bounce.set(1);
        shuriken.body.allowGravity = false;
        shuriken.body.velocity.x = -200;

        //Gestion des animations
        var animrun = player.animations.add('animrun', [0,1,2,3,4,5,6,7,8,9]);
        var animglisse = player.animations.add('animglisse', [10,11,12,13,14,15,16,17,18,19]);
        var animsaut = player.animations.add('animsaut', [20,21,22,23,24,25,26,27,28,29]);
        var animattaque = player.animations.add('animattaque', [30,31,32,33,34,35,36,37,38,39]);
        var animsautattaque = player.animations.add('animsautattaque', [40,41,42,43,44,45,46,47,48,49]);
        var animmort = player.animations.add('animmort', [50,51,52,53,54,55,56,57,58,59]);


        //On créer l'affichage du score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '26px', fill: '#000' });

        //Pour pouvoir utiliser les touches du clavier
        this.cursors= game.input.keyboard.createCursorKeys();
    },

    update: function () {

        //On place tout notre update dans un booléen pour pouvoir le stopper à la mort

        if (mort == false) {
            //Positionnement du joueur

            //Mise en place des annimations selon la touche pressée
            if (this.cursors.right.isDown) {
                player.animations.play('animattaque', 20, false);
                player.body.setSize(40, 230, 70);
            }
            else
            {
                player.animations.play('animrun', 10, true);
                player.body.setSize(40, 230, 70);

            }


            if (this.cursors.up.isDown && playerEstAuSol) {
                player.body.velocity.y = -600;
                player.animations.play('animsaut', 10, false);
                player.body.gravity.y = 2500;
                over = false;
            }

            if (this.cursors.down.isDown) {
                player.body.gravity.y = 100000;
                player.body.setSize(150, 200);
                player.body.velocity.y = -100;
                player.animations.play('animglisse', 50, false);
            }


            // Gestion des colisions
            if (checkOverlap(player, sol)) {
                playerEstAuSol = true;
            }

            game.physics.arcade.overlap(player, shuriken, gameOver, null, this);


            // Défilement du sol
            sol.tilePosition.x += solV;

            //Update du score
            updateScore();
        }
    }

};

function checkOverlap(player, sol){

    var boundsA = player.getBounds();
    var boundsB = sol.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function gameOver(){
    player.animations.play('animmort', 10, false);
    mort = true;
    game.add.text(80, game.world.height - 350, 'Vous êtes mort 😞 Votre score est de ' + score + ' points !', {
        font: '35px Arial',
        fill: '#000000'
    });
    game.add.text(160, game.world.height - 80, 'Appuyez sur F5 pour rejouer !', {
        font: '35px Arial',
        fill: '#000000'
    });
    scoreText.destroy();
}

function updateScore()
{
    if (compteur == 10)
    {
        score += 1;
        compteur = 0;
        scoreText.text = 'Score: ' + score;

    }
    compteur ++;
}

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
        player = game.add.sprite(150, 210, 'player');

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



game.state.add('ninja', ninja);
game.state.add('menu', menu);
game.state.start('menu');
