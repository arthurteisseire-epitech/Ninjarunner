var gameOverState = {

    create: function ()
    {
        var colorText = '#DDDDDD';
        game.stage.backgroundColor = "#FFFFFF";
        bgGameOver = game.add.sprite(0, 0, 'bgGameOver');

        if (score >= meilleurScore)
        {
            game.add.text(20, 360, 'Nouveau Record !', {font: '30px njnaruto', fill: colorText});
            game.add.text(20, 410, 'Ancien Record : ' + meilleurScore, {font: '30px njnaruto', fill: colorText});
            game.add.text(20, 460, 'Nouveau Record : ' + score, {font: '30px njnaruto', fill: colorText});
            meilleurScore = score;
        }
        else
        {
            game.add.text(20, 460, 'Record : ' + meilleurScore + ' points', {font: '30px njnaruto', fill: colorText});
            game.add.text(20, 410, 'Score : ' + score + ' points', {font: '30px njnaruto', fill: colorText});
        }

        game.add.text(20, 20, 'Game Over', {font: '60px njnaruto', fill: colorText});
        game.add.text(510, 360, 'ENTRER pour rejouer', {font: '35px njnaruto', fill: colorText});
        game.add.text(530, 480, 'Espace  pour  voir  les  commandes', {font: '20px njnaruto', fill:'#FFFFFF'});
    },

    update: function ()
    {
        // Appuyer entrer pour rejouer
        var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key.onDown.addOnce(this.restart, this);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    restart: function ()
    {
        game.state.start('Game');
    },

    start: function ()
    {
        game.state.start('Rules');
    }
};
