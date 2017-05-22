var player;
var route;
var terre;
var pont;
var mort;
var routeV;
var objectSpeed;
var interframeSpeed;
var shuriken;
var enemy;
var meilleurScore = 0;
var pique;
var doublePique;
var triplePique;
var score;
var compteur;
var limiteInterframe;
var interframe;
var bgSound;
var mortSound;
var random;
var animrun;
var animglisse;
var animsaut;
var animattaque;
var animmort;
var animshuriken;
var animfumee;
var fumee;
var vitesseJoueur;
var vitesseShuriken;
var bgMenu;
var bg1;
var bg2;
var bg3;
var bgGameOver;
var bgWin;
var scoreToChangeBackground1;
var scoreToChangeBackground2;


var gameState = {

    create: function ()
    {
        // Initialisation des valeurs par defaut des variables
		initVariables();

        //Création de tout ce qui est nécessaire pour jouer
        createAllElements();

        //Pour pouvoir utiliser les touches du clavier
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function ()
    {
        if (mort == false)
        {
            launchRandomObject();

            //Mise en place des annimations selon la touche pressée
            if (this.cursors.right.isDown)
            {
                player.animations.play('animattaque', 20, false);
                player.body.setSize(80, 110, 35, 15);
            }
            else
            {
                player.animations.play('animrun', vitesseJoueur, true);
                player.body.setSize(80, 110, 35, 15);
            }

            if ((this.cursors.up.isDown || this.spaceKey.isDown) && player.body.onFloor())
            {
                player.animations.play('animsaut', vitesseJoueur, false);
                player.body.velocity.y = -1300;
            }

            if (this.cursors.down.isDown)
            {
                player.body.setSize(100, 80, 20, 30);
                player.animations.play('animglisse', 50, false);
            }


            // Gestion des collisions
            game.physics.arcade.overlap(player, shuriken, gameOver, null, this);
            game.physics.arcade.overlap(player, pique, gameOver, null, this);
            game.physics.arcade.overlap(player, doublePique, gameOver, null, this);
            game.physics.arcade.overlap(player, triplePique, gameOver, null, this);
            game.physics.arcade.overlap(player, enemy, eventEnemy, null, this);


            // Défilement de la route
            route.tilePosition.x += routeV;
            terre.tilePosition.x += routeV;
            pont.tilePosition.x += routeV;


            //Update du score et de la vitesse
            updateScore();
            updateSpeed();


            changeBackground1At(scoreToChangeBackground1);
            changeBackground2At(scoreToChangeBackground2);

            win();
        }
    },

    // Fonction pour afficher les hit box de collision
    render: function ()
    {
		/*
         game.debug.body(player);
         game.debug.body(pique);
         game.debug.body(doublePique);
         game.debug.body(triplePique);
         game.debug.body(shuriken);
         game.debug.body(route);
         game.debug.body(enemy);
		 */
    }

};
