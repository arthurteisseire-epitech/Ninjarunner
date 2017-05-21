var menuState = {

    create: function ()
    {
        // On ajoute les images pour le menu
        game.stage.backgroundColor = "#FFFFFF";
        game.add.sprite(0, 0, 'bgMenu');

        //On insère du texte
        game.add.text(20, 20, 'Ninja  Runner', {font: '50px njnaruto', fill:'#FFFFFF'});
        game.add.text(20, game.world.height-410, 'Appuyer   sur   ENTRER    pour   commencer   !', {font: '25px njnaruto', fill:'#FFFFFF'});
        game.add.text(420, 470, 'Espace  pour  voir  les  commandes', {font: '25px njnaruto', fill:'#FFFFFF'});

        // On lui demande d'appuyer sur une touche (Entrer)1
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
        enterKey.onDown.addOnce(this.start, this);
    },

    start: function ()
    {
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if (enterKey.isDown)
        {
            game.state.start('Game');
        }
        else if (spaceKey.isDown)
        {
            game.state.start('Rules');
        }
    }

};


