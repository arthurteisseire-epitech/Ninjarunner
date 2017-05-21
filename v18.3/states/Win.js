var winState = {

    create: function ()
    {
        var colorText = '#000000';
        game.stage.backgroundColor = "#000000";
        bgWin = game.add.sprite(0, 0, 'bgWin');


        game.add.text(20, 20, 'Felicitations ! Vous avez termine NinjaRunner !', {
            font: '35px njnaruto',
            fill: colorText
        });
        meilleurScore = score;

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
