function initVariables()
{
    mort = false;
    routeV = -5;
    objectSpeed = -300;
    interframeSpeed = 0;
    score = 0;
    compteur = 0;
    limiteInterframe = Math.floor(Math.random()) * 200 + 100;
    interframe = 0;
}


function updateSpeed()
{
    if (interframeSpeed > 20)
    {
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


function launchRandomObject()
{
    if (interframe > limiteInterframe)
    {
        random = Math.round(Math.random() * 100);
        if ((random % 2 == 0) && shuriken.x < 300 && pique.x < 300)
        {
            launchPique();
        }
        else if ((random % 2 == 1) && shuriken.x < 300 && pique.x < 300)
        {
            launchShuriken();
        }
        limiteInterframe = Math.floor(Math.random()) * 200 + 100;
    }
    interframe ++;
}


function launchShuriken()
{
    shuriken = game.add.sprite(900, 390,'shuriken');
    game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
    animshuriken = shuriken.animations.add('animshuriken', [0,1,2,3]);
    shuriken.animations.play('animshuriken', 20, true);
    shuriken.body.allowGravity = false;
    shuriken.body.velocity.x = objectSpeed;
    shuriken.body.setSize(32, 32, 3, 5);
}


function launchPique()
{
    pique = game.add.sprite(900, 445,'pique');
    game.physics.arcade.enable(pique, Phaser.Physics.ARCADE);
    pique.body.allowGravity = false;
    pique.body.velocity.x = objectSpeed;
    pique.body.setSize(3, 64, 24);
}


function waitForGameOver()
{
    player.animations.play('animmort', 10, false);
    bgSound.pause();
    mortSound.play();
    game.time.events.add(Phaser.Timer.SECOND * 1, gameOver, this);
    mort = true;
    pique.body.velocity.x = 0;
    shuriken.body.velocity.x = 0;
}


function gameOver()
{
    game.state.start('GameOver');
}

