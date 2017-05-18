var bootState = {

    preload: function ()
    {
        game.load.image('bar_pleine', 'assets/images/bar_pleine.png');
        game.load.image('bar_vide', 'assets/images/bar_vide.png');
    },

    create: function ()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('Preloader');
    }

};