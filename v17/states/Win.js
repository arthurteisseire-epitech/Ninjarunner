var winState = {

    create: function ()
    {
        var colorText = '#000000';
        game.stage.backgroundColor = "#FFFFFF";
        bgWin = game.add.sprite(0, 0, 'bgWin');
        //game.add.tileSprite(0, 480, 900, 40, 'route');


        game.add.text(20, 340, 'Félicitations ! Vous avez terminé NinjaRunner !', {
            font: '35px Arial',
            fill: colorText
        });
        meilleurScore = score;


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
