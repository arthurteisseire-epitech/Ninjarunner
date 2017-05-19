function initVariables()
{
    mort = false;
    routeV = -6;
    objectSpeed = -300;
    interframeSpeed = 0;
    score = 0;
    compteur = 0;
    limiteInterframe = Math.round(Math.random()) * 150;
    interframe = 0;
    vitesseJoueur = 10;
    vitesseShuriken = 10;
    scoreToChangeBackground1 = 2400;
    scoreToChangeBackground2 = 8000;
}


function updateSpeed()
{
    if (interframeSpeed > 20)
    {
        routeV -= 0.05;
        objectSpeed = routeV * 50;
        vitesseJoueur = -routeV;
        vitesseShuriken = -routeV;
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
        random = Math.round(Math.random() * 300);
        if ((random % 3 == 0) && shuriken.x < 300 && pique.x < 300 && enemy.x < 300)
        {
            launchPique();
        }
        else if ((random % 3 == 1) && shuriken.x < 300 && pique.x < 300 && enemy.x < 300)
        {
            if (score > scoreToChangeBackground1)
            {
                launchShuriken();
            }
        }
        else if ((random % 3 == 2) && shuriken.x < 300 && pique.x < 300 && enemy.x < 300)
        {
            if (score > scoreToChangeBackground2)
            {
                launchEnemy();
            }
        }
        limiteInterframe = Math.round(Math.random()) * 70;
        interframe = 0;
    }
    interframe ++;

}


function launchShuriken()
{
    shuriken = game.add.sprite(900, 390,'shuriken');
    game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
    animshuriken = shuriken.animations.add('animshuriken', [0,1,2,3]);
    shuriken.animations.play('animshuriken', vitesseShuriken, true);
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


function launchEnemy()
{
    enemy = game.add.sprite(900, 400, 'enemy');
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    pique.body.allowGravity = false;
    enemy.body.velocity.x = objectSpeed;
}


function eventEnemy()
{
    if (this.cursors.right.isDown && game.physics.arcade.overlap(player, enemy))
    {
        enemy.alpha = 0;
    }
    else
    {
        gameOver();
    }
}


function changeBackgroundBetweenScore(min, max)
{
    if (score > min && score < max)
    {
        bg1.visible = false;
        routeV = -8;
    }

}

function changeBackgroundAfter(min)
{
    if (score > min)
    {
        bg2.visible = false;
        routeV = -9;
    }

}

function gameOver()
{
    player.animations.play('animmort', 10, false);
    bgSound.pause();
    mortSound.play();
    game.time.events.add(Phaser.Timer.SECOND * 1, startGameOver, this);
    mort = true;
    pique.body.velocity.x = 0;
    shuriken.body.velocity.x = 0;
}


function startGameOver()
{
    game.state.start('GameOver');
}

