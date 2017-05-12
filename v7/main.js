var game = new Phaser.Game(903, 519);
var player;
var mort = false;
var route;
var routeV = -5;
var objectSpeed = -300;
var interframeSpeed = 0;
var shuriken;
var pique;
var score = 0;
var compteur = 0;
var interframeShuriken = 0;
var limitInterframeShuriken = Math.floor(Math.random()*200 + 50);
var interframePique = 0;
var limitInterframePique = Math.floor(Math.random()*200 + 50);

var ninja = {
    preload: function () {
        game.load.image('route', 'assets/images/route.png');
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.image('pique', 'assets/images/pique.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#FFFFFF";

        //On créer le background qui sert de background
        game.add.sprite(0, 0, 'bg');


        //On créer la route
        route = game.add.tileSprite(0, 480, 900, 40, 'route');
        game.physics.enable(route, Phaser.Physics.ARCADE);
        route.body.allowGravity = false;
        route.body.collideWorldBounds = true;
        route.body.immovable = true;
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
        shuriken.body.bounce.set(1);
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


        //On créer l'affichage du score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '26px', fill: '#000' });

        //Pour pouvoir utiliser les touches du clavier
        this.cursors= game.input.keyboard.createCursorKeys();
    },

    update: function () {

        //On place tout notre update dans un booléen pour pouvoir le stopper à la mort

        if (mort == false) {


            //Mise en place des annimations selon la touche pressée
            if (this.cursors.right.isDown) {
                player.animations.play('animattaque', 20, false);
            }
            else
            {
                player.animations.play('animrun', 10, true);
                player.body.setSize(80,110, 35, 15);
                game.physics.arcade.collide(player, route, null, this);

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

            game.physics.arcade.overlap(player, shuriken, gameOver, null, this);
            game.physics.arcade.overlap(player, pique, gameOver, null, this);


            // Défilement du route
            route.tilePosition.x += routeV;

            //Update du score et de la vitesse
            updateScore();
            updateSpeed();
        }

    },

    render : function() {

    /*game.debug.body(player);
    game.debug.body(pique);
    game.debug.body(shuriken);
    game.debug.body(route);*/

}

};

function checkOverlap(player, route){

    var boundsA = player.getBounds();
    var boundsB = route.getBounds();

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


function updateSpeed()
{
    if (interframeSpeed > 200) {
        objectSpeed -= 10;
        routeV = objectSpeed / 65;
        interframeSpeed = 0;
    }
    interframeSpeed += 10;

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



var menu = {
    preload: function () {
        // On charge les images
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('player', 'assets/images/accueil.png');
        game.load.image('route', 'assets/images/route.png');
    },
    create: function () {
        // On ajoute les images pour le menu
        game.stage.backgroundColor = "#FFFFFF";
        game.add.sprite(0, 0, 'bg');
        bg = game.add.tileSprite(0, 480, 900, 40, 'route');
        player = game.add.sprite(150, 310, 'player');

        //On insère du texte
        var text = game.add.text(20, 20, 'NinjaRunner', {font: '50px Arial', fill:'#000000'});
        var text2 = game.add.text(20, game.world.height-410, 'Appuyer sur ENTRER pour commencer !', {font: '25px Arial', fill:'#000000'});

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
