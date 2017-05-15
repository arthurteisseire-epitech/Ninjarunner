var menuState = {

    create: function ()
    {
        // On ajoute les images pour le menu
        game.stage.backgroundColor = "#FFFFFF";
        game.add.sprite(0, 0, 'bg');
        bg = game.add.tileSprite(0, 480, 900, 40, 'route');
        player = game.add.sprite(150, 310, 'playerAccueil');

        //On insère du texte
        var text = game.add.text(20, 20, 'NinjaRunner', {font: '50px Arial', fill:'#000000'});
        var text2 = game.add.text(20, game.world.height-410, 'Appuyer sur ENTRER pour commencer !', {font: '25px Arial', fill:'#000000'});

        // On lui demande d'appuyer sur une touche (Entrer)1
        var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key.onDown.addOnce(this.start, this);
    },

    start: function ()
    {
        game.state.start('Game');
    }

};


