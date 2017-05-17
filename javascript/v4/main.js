var game = new Phaser.Game(900, 506);
var player;
var mort = false;
var sol;
var solV;
var shuriken = 0;
var layer;
var scoreText;

var ninja = {
    preload: function () {
        //Chargement des images
        game.load.image('sol', 'assets/images/herbe.png');
        game.load.image('ciel', 'assets/images/ciel.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
    },

    create: function () {
        //Setup du jeu + affichage

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'ciel');
        game.physics.arcade.gravity.y = 1200;

        sol = game.add.tileSprite(0, 385, 900, 121, 'sol');
        game.physics.enable(sol, Phaser.Physics.ARCADE);
        sol.body.allowGravity = false;
        solV = -5;

        shuriken = game.add.sprite(900, 450, 'shuriken');
        game.physics.enable(shuriken, Phaser.Physics.ARCADE);
        shuriken.body.allowGravity = false;
        //shuriken.body.velocity.x=-150;


        player = game.add.sprite(450, 300, 'player');
        player.anchor.set(0.5);
        game.physics.arcade.enable([player, sol], Phaser.Physics.ARCADE);




        var animrun = player.animations.add('animrun', [0,1,2,3,4,5,6,7,8,9]);
        var animglisse = player.animations.add('animglisse', [10,11,12,13,14,15,16,17,18,19]);
        var animsaut = player.animations.add('animsaut', [20,21,22,23,24,25,26,27,28,29]);
        var animattaque = player.animations.add('animattaque', [30,31,32,33,34,35,36,37,38,39]);
        var animsautattaque = player.animations.add('animsautattaque', [40,41,42,43,44,45,46,47,48,49]);
        var animmort = player.animations.add('animmort', [50,51,52,53,54,55,56,57,58,59]);

        //player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(150, 139, 20, 100);


        this.cursors= game.input.keyboard.createCursorKeys();

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '26px', fill: '#000' });
    },
    update: function () {

        //Animations du jeu
        if (mort == false) {
            player.body.velocity.x = 0;
            player.body.gravity.y = 500;

            if (this.cursors.left.isDown && player.body.onFloor()) {
                player.animations.play('animmort', 10, false);
            }

            else if (this.cursors.right.isDown && player.body.onFloor()) {
                player.animations.play('animattaque', 20, false);
                player.body.setSize(150, 139);
            }
            else if (player.body.onFloor()) {
                player.animations.play('animrun', 10, true);
                //player.body.setSize(150, 139, 20, 100);
            }

            if (this.cursors.up.isDown && player.body.onFloor()) {
                player.body.setSize(150, 139);
                player.body.velocity.y = -600;
                player.animations.play('animsaut', 10, false);
                score += 10;
                scoreText.text = 'Score: ' + score;
            }

            if (this.cursors.up.isDown && this.cursors.right.isDown && player.body.onFloor()) {
                player.body.setSize(150, 139);
                player.body.velocity.y = -600;
                player.animations.play('animsautattaque', 20, false);
            }


            if (this.cursors.down.isDown && player.body.onFloor()) {
                player.body.gravity.y = 100000;
                player.body.setSize(150, 100);
                player.body.velocity.y = -100;
                player.animations.play('animglisse', 50, false);
            }

            sol.tilePosition.x += solV;
            /*if (launchShuriken() == true && shuriken.x < -32) {
                shuriken = game.add.tileSprite(900, 290, 32, 32, 'shuriken');
            }
            //shuriken.x -= 5;

            if ((shuriken.x - 32 < player.x) && (shuriken.x + 32 > player.x) && (player.y < shuriken.y + 32)) {
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


                //var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                //key.onDown.addOnce(this.start, this);

            }*/

            //if (launchShuriken() && shuriken.x < -32)

            //shuriken = game.add.tileSprite(900, 290, 32, 32, 'shuriken');


            var test = function () {
                console.log('toto');
            };

            //game.physics.arcade.collide(player, sol, test, null, this);
            game.physics.arcade.overlap(player, shuriken, test, null, this);

            shuriken.x -= 5;

            updateScore();

        }

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

var score = 0;
var compteur = 0;
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



// Phase de test pour GameOver
function gameOver()
{
    player.animations.play('animmort', 10, false);
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
