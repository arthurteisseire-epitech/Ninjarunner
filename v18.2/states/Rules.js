var rulesState = {

    create: function ()
    {
        // On ajoute les images pour le menu
        game.stage.backgroundColor = "#FFFFFF";
        game.add.sprite(0, 0, 'bgMenu');

        //On insère du texte
        game.add.text(20, 20, 'Saut  : Fleche  du  haut / Espace', {font: '25px njnaruto', fill:'#FFFFFF'});
        game.add.text(20, 70, 'Glisse  :  Fleche  du  bas', {font: '25px njnaruto', fill:'#FFFFFF'});
        game.add.text(20, 120, 'Attaque  :  Fleche  de  droite', {font: '25px njnaruto', fill:'#FFFFFF'});
        game.add.text(420, 470, 'Espace  pour  revenir  au  Menu', {font: '25px njnaruto', fill:'#FFFFFF'});

        // On lui demande d'appuyer sur une touche (Entrer)1
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    start: function ()
    {
        game.state.start('Menu');
    }

};
