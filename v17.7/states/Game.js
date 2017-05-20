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


        //On créer le background
        bg3 = game.add.sprite(0, 0, 'bg3');
        bg2 = game.add.sprite(0, 0, 'bg2');
        bg1 = game.add.sprite(0, 0, 'bg1');


        //On créer le pont
        pont = game.add.tileSprite(0, 470, 900, 40, 'pont');
        game.physics.enable(pont, Phaser.Physics.ARCADE);
        pont.body.setSize(0, 0, 0, 20);

        //On créer le chemin de terre
        terre = game.add.tileSprite(0, 470, 900, 40, 'terre');
        game.physics.enable(terre, Phaser.Physics.ARCADE);
        terre.body.setSize(0, 0, 0, 20);

        //On créer la route
        route = game.add.tileSprite(0, 470, 900, 40, 'route');
        game.physics.enable(route, Phaser.Physics.ARCADE);
        route.body.setSize(0, 0, 0, 20);


        //On créer le joueur
        player = game.add.sprite(300, 50, 'player');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 5500;
        player.body.setSize(80, 110, 35, 15);
        player.body.collideWorldBounds = true;


        //On créer l'ennemie
        enemy = game.add.sprite(-900, 400, 'enemy');
        game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.velocity.x = objectSpeed;


        //On créer le shuriken
        shuriken = game.add.sprite(-32, 270,'shuriken');
        game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
        shuriken.body.allowGravity = false;
        shuriken.body.velocity.x = objectSpeed;


        //On créer le pique
        pique = game.add.sprite(-204, 350, 'pique');
        game.physics.arcade.enable(pique, Phaser.Physics.ARCADE);
        pique.body.allowGravity = false;
        pique.body.velocity.x = objectSpeed;


        //Gestion des animations
        animrun = player.animations.add('animrun', [0,1,2,3,4,5,6,7,8,9]);
        animglisse = player.animations.add('animglisse', [10,11,12,13,14,15,16,17,18,19]);
        animsaut = player.animations.add('animsaut', [20,21,22,23,24,25,26,27,28,29]);
        animattaque = player.animations.add('animattaque', [30,31,32,33,34,35,36,37,38,39]);
        animmort = player.animations.add('animmort', [50,51,52,53,54,55,56,57,58,59]);


        //Gestion du son
        bgSound = game.add.audio('bgsound');
        mortSound = game.add.audio('mortsound');
        bgSound.play();
        bgSound.volume -= 0.5;


        //On créer l'affichage du score
        scoreText = game.add.text(16, 45, 'Score: 0', { font: '26px njnaruto', fill: '#FFFFFF' });
        meilleurscoreText = game.add.text(16, 16, 'Meilleur score: '+ meilleurScore, { font: '26px njnaruto', fill: '#FFFFFF' });


        //Pour pouvoir utiliser les touches du clavier
        this.cursors = game.input.keyboard.createCursorKeys();

    },

    update: function ()
    {

        if (mort == false)
        {

            //Mise en place des annimations selon la touche pressée

            if (this.cursors.right.isDown)
            {
                player.animations.play('animattaque', 20, false);
            }
            else
            {
                player.animations.play('animrun', vitesseJoueur, true);
                player.body.setSize(80, 110, 35, 15);
            }

            if (this.cursors.up.isDown && player.body.onFloor())
            {
                player.animations.play('animsaut', vitesseJoueur, false);
                player.body.velocity.y = -1300;
            }

            if (this.cursors.down.isDown)
            {
                player.body.setSize(100, 80, 20, 30);
                player.animations.play('animglisse', 50, false);
            }

            launchRandomObject();

            // Gestion des collisions

            game.physics.arcade.overlap(player, shuriken, gameOver, null, this);
            game.physics.arcade.overlap(player, pique, gameOver, null, this);
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
       /*  game.debug.body(player);
         game.debug.body(pique);
         game.debug.body(shuriken);
         game.debug.body(route);
         game.debug.body(enemy);*/

    }

};
