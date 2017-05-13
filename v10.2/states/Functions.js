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


function iCanLaunchShuriken ()
{
    interframeShuriken +=1;
    if (interframeShuriken > limitInterframeShuriken && shuriken.x < 300 && pique.x < 300)
    {
        interframeShuriken = 0;
        limitInterframeShuriken = Math.floor(Math.random()*200 + 50);
        return true;
    }
    return false;
}


function iCanLaunchPique ()
{
    interframePique +=1;
    if (interframePique > limitInterframePique && shuriken.x < 300 && pique.x < 300)
    {
        interframePique = 0;
        limitInterframePique = Math.floor(Math.random()*200 + 50);
        return true;
    }
    return false;
}


function waitForGameOver()
{
    player.animations.play('animmort', 10, false);
    bgsound.pause();
    mortsound.play();
    game.time.events.add(Phaser.Timer.SECOND * 1, gameOver, this);
    mort = true;
    pique.body.velocity.x = 0;
    shuriken.body.velocity.x = 0;
}


function gameOver()
{
    game.state.start('GameOver');
}

