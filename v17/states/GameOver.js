var gameOverState = {

    create: function ()
    {
        var colorText = '#DDDDDD';
        game.stage.backgroundColor = "#FFFFFF";
        bgGameOver = game.add.sprite(0, 0, 'bgGameOver');
        //game.add.tileSprite(0, 480, 900, 40, 'route');


        if (score >= meilleurScore)
        {
            game.add.text(20, 340, 'Nouveau Record !', {
                font: '35px Arial',
                fill: colorText
            });

            game.add.text(20, 390, 'Ancien Record : ' + meilleurScore, {
                font: '35px Arial',
                fill: colorText
            });

            game.add.text(20, 440, 'Nouveau Record : ' + score, {
                font: '35px Arial',
                fill: colorText
            });
            game.add.text(20, 20, 'Game Over', {
                font: '60px Arial',
                fill: colorText
            });

            meilleurScore = score;
        }

        else
        {
            game.add.text(20, 440, 'Record : ' + meilleurScore + ' points', {
                font: '35px Arial',
                fill: colorText
            });
            game.add.text(20, 390, 'Score : ' + score + ' points', {
                font: '35px Arial',
                fill: colorText
            });
            game.add.text(20, 20, 'Game Over', {
                font: '60px Arial',
                fill: colorText
            });
        }

        game.add.text(510, 400, 'ENTRER pour rejouer', {
            font: '35px Arial',
            fill: colorText
        });
    },

    update: function ()
    {
        // Appuyer entrer pour rejouer
        var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key.onDown.addOnce(this.restart, this);
    },

    restart: function ()
    {
        game.state.start('Game');
    }

};
