var player;
var route;
var mort;
var routeV;
var objectSpeed;
var interframeSpeed;
var shuriken;
var meilleurScore = 0;
var pique;
var score;
var compteur;
var interframeShuriken;
var limitInterframeShuriken;
var interframePique;
var limitInterframePique;

var gameState = {
    preload: function () {
        game.load.image('route', 'assets/images/route.png');
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.image('pique', 'assets/images/pique.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
        game.load.audio('bgsound', 'assets/audio/bgsound.mp3');
        game.load.audio('mortsound', 'assets/audio/mort.mp3');
    },

    create: function () {


		initVariables();
        //On créer le background
        game.add.sprite(0, 0, 'bg');
        game.stage.backgroundColor = "#FFFFFF";


        //On créer la route
        route = game.add.tileSprite(0, 480, 900, 40, 'route');
        game.physics.enable(route, Phaser.Physics.ARCADE);
        route.body.setSize(0, 0, 0, 20);


        //On créer le joueur
        player = game.add.sprite(300, 50, 'player');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 5500;
        player.body.setSize(80, 110, 35, 15);
        player.body.collideWorldBounds = true;

        //On créer le shuriken
        shuriken = game.add.sprite(-32, 270,'shuriken');
        game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
        shuriken.body.allowGravity = false;
        shuriken.body.velocity.x = objectSpeed;

        //On créer le pique
        pique = game.add.sprite(-64, 350, 'pique');
        game.physics.arcade.enable(pique, Phaser.Physics.ARCADE);
        pique.body.allowGravity = false;
        pique.body.velocity.x = objectSpeed;


        //Gestion des animations
        var animrun = player.animations.add('animrun', [0,1,2,3,4,5,6,7,8,9]);
        var animglisse = player.animations.add('animglisse', [10,11,12,13,14,15,16,17,18,19]);
        var animsaut = player.animations.add('animsaut', [20,21,22,23,24,25,26,27,28,29]);
        var animattaque = player.animations.add('animattaque', [30,31,32,33,34,35,36,37,38,39]);
        var animsautattaque = player.animations.add('animsautattaque', [40,41,42,43,44,45,46,47,48,49]);
        var animmort = player.animations.add('animmort', [50,51,52,53,54,55,56,57,58,59]);

        //Gestion du son

        bgsound = game.add.audio('bgsound');
        mortsound = game.add.audio('mortsound');
        bgsound.play();
        bgsound.volume -= 0.5;


        //On créer l'affichage du score
        scoreText = game.add.text(16, 45, 'Score: 0', { fontSize: '26px', fill: '#000' });
        meilleurscoreText = game.add.text(16, 16, 'Meilleur score: '+ meilleurScore, { fontSize: '26px', fill: '#000' });

        //Pour pouvoir utiliser les touches du clavier
        this.cursors= game.input.keyboard.createCursorKeys();

        //reset des données pour le replay
		routeV = -5;
		objectSpeed = -300;
		score = 0;
		mort = false;

    },

    update: function () {

        if(mort == false){

            //Mise en place des annimations selon la touche pressée

            if (this.cursors.right.isDown) {
                player.animations.play('animattaque', 20, false);
            }
            else
            {
                player.animations.play('animrun', 10, true);
                player.body.setSize(80,110, 35, 15);
            }


            if (this.cursors.up.isDown && player.body.onFloor()) {
                player.animations.play('animsaut', 10, false);
                player.body.velocity.y = -1500;
            }

            if (this.cursors.down.isDown) {
                player.body.setSize(100, 90, 20, 30);
                player.animations.play('animglisse', 50, false);
            }

            if (iCanLaunchShuriken())
            {
                shuriken = game.add.sprite(900, 390,'shuriken');
                game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
                shuriken.body.allowGravity = false;
                shuriken.body.velocity.x = objectSpeed;
            }

            if (iCanLaunchPique())
            {
                pique = game.add.sprite(1300, 440,'pique');
                game.physics.arcade.enable(pique, Phaser.Physics.ARCADE);
                pique.body.allowGravity = false;
                pique.body.velocity.x = objectSpeed;
                pique.body.setSize(3, 64, 25);

            }

            // Gestion des collisions
            game.physics.arcade.overlap(player, shuriken, waitForGameOver, null, this);
            game.physics.arcade.overlap(player, pique, waitForGameOver, null, this);

            // Défilement de la route
            route.tilePosition.x += routeV;

            //Update du score et de la vitesse
            updateScore();
            updateSpeed();

        }


    },

    // Fonction pour afficher les box de collision
    render : function() {

        /*game.debug.body(player);
         game.debug.body(pique);
         game.debug.body(shuriken);
         game.debug.body(route);*/

    }

};

function waitForGameOver() {
    player.animations.play('animmort', 10, false);
    bgsound.pause();
    mortsound.play();
    game.time.events.add(Phaser.Timer.SECOND * 1, gameOver, this);
    mort = true;
    pique.body.velocity.x = 0;
    shuriken.body.velocity.x = 0;
}


function gameOver(){
    game.state.start('GameOver');
}

function initVariables()
{
	mort = false;
	routeV = -5;
	objectSpeed = -300;
	interframeSpeed = 0;
	score = 0;
	compteur = 0;
	interframeShuriken = 0;
	limitInterframeShuriken = Math.floor(Math.random()*200 + 50);
	interframePique = 0;
	limitInterframePique = Math.floor(Math.random()*200 + 50);
}

function updateSpeed()
{
    if (interframeSpeed > 20) {
        objectSpeed -= 10;
        routeV = objectSpeed / 65;
        interframeSpeed = 0;
    }
    interframeSpeed ++;

}

function updateScore()
{
    if (compteur == 10)
    {
        score += Math.round(-routeV);
        compteur = 0;
        scoreText.text = 'Score: ' + score;

    }
    compteur ++;
}


function iCanLaunchShuriken ()
{
    interframeShuriken +=1;
    if (interframeShuriken > limitInterframeShuriken && shuriken.x < 100 && pique.x < 100){
        interframeShuriken = 0;
        limitInterframeShuriken = Math.floor(Math.random()*200 + 50);
        return true;
    }
    return false;
}


function iCanLaunchPique ()
{
    interframePique +=1;
    if (interframePique > limitInterframePique && shuriken.x < 100 && pique.x < -100){
        interframePique = 0;
        limitInterframePique = Math.floor(Math.random()*200 + 50);
        return true;
    }
    return false;
}


