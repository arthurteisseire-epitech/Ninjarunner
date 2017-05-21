function initVariables()
{
    mort = false;
    routeV = -6;
    objectSpeed = -300;
    interframeSpeed = 0;
    score = 0;
    compteur = 0;
    limiteInterframe = Math.round(Math.random()) * 70;
    interframe = 0;
    vitesseJoueur = 10;
    vitesseShuriken = 10;
    scoreToChangeBackground1 = 530;
    scoreToChangeBackground2 = 1670;
}


function updateSpeed()
{
    if (interframeSpeed > 20)
    {
        routeV -= 0.035;
        objectSpeed = routeV * 61.5;
        vitesseJoueur = -routeV * 1.7;
        vitesseShuriken = -routeV;
        interframeSpeed = 0;
    }
    interframeSpeed ++;
}


function updateScore()
{
    if (compteur == 10)
    {
        score += 2;
        compteur = 0;
        scoreText.text = 'Score: ' + score;
    }
    compteur ++;
}


function launchRandomObject()
{
    if (interframe > limiteInterframe && score < 2750)
    {
        random = Math.round(Math.random() * 300);
        var randomNumberPique = Math.round(Math.random() * 300);
        if ((random % 3 == 0) && shuriken.x < 300 && pique.x < 300 && doublePique.x < 300 && triplePique.x < 300 && enemy.x < 300)
        {
            if (randomNumberPique % 5 == 0 && routeV < -7.5)
            {
                launchTriplePique();
            }
            if (randomNumberPique % 5 == 1 && routeV < -6.5)
            {
                launchDoublePique();
            }
            else if (randomNumberPique % 5 > 1)
            {
                launchPique();
            }
        }
        else if ((random % 3 == 1) && shuriken.x < 300 && pique.x < 300 && doublePique.x < 300 && triplePique.x < 300 && enemy.x < 300)
        {
            if (score > scoreToChangeBackground1)
            {
                launchShuriken();
            }
        }
        else if ((random % 3 == 2) && shuriken.x < 300 && pique.x < 300 && doublePique.x < 300 && triplePique.x < 300 && enemy.x < 300)
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
    shuriken = game.add.sprite(900, 380,'shuriken');
    game.physics.arcade.enable(shuriken, Phaser.Physics.ARCADE);
    animshuriken = shuriken.animations.add('animshuriken', [0,1,2,3]);
    shuriken.animations.play('animshuriken', vitesseShuriken, true);
    shuriken.body.allowGravity = false;
    shuriken.body.velocity.x = objectSpeed;
    shuriken.body.setSize(32, 32, 3, 5);
}


function launchPique()
{
    pique = game.add.sprite(900, 445, 'pique');
    game.physics.arcade.enable(pique, Phaser.Physics.ARCADE);
    pique.body.allowGravity = false;
    pique.body.velocity.x = objectSpeed;
    pique.body.setSize(3, 64, 24);
}


function launchDoublePique()
{
    doublePique = game.add.sprite(900, 445,'doublePique');
    game.physics.arcade.enable(doublePique, Phaser.Physics.ARCADE);
    doublePique.body.allowGravity = false;
    doublePique.body.velocity.x = objectSpeed;
    doublePique.body.setSize(20, 62, 20, 5);
}


function launchTriplePique()
{
    triplePique = game.add.sprite(900, 445,'triplePique');
    game.physics.arcade.enable(triplePique, Phaser.Physics.ARCADE);
    triplePique.body.allowGravity = false;
    triplePique.body.velocity.x = objectSpeed;
    triplePique.body.setSize(43, 62, 24, 5);
}


function launchEnemy()
{
    enemy = game.add.sprite(900, 390, 'enemy');
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.allowGravity = false;
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


function changeBackground1At(scoreToChangeBackground)
{
    if (score == scoreToChangeBackground - 70)
    {
        routeV = -7;
    }
    else if (score == scoreToChangeBackground)
    {
        bg1.visible = false;
        route.visible = false;
    }
}


function changeBackground2At(scoreToChangeBackground)
{
    if (score == scoreToChangeBackground - 88)
    {
        routeV = -8;
    }
    else if (score == scoreToChangeBackground)
    {
        bg2.visible = false;
        terre.visible = false;
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

function win(){
    if(score > 2810){
        game.state.start('Win');
    }
}


function startGameOver()
{
    game.state.start('GameOver');
}

