var preloaderState = {

    preload: function ()
    {
        game.load.image('playerAccueil', 'assets/images/accueil.png');
        game.load.image('route', 'assets/images/route.png');
        game.load.image('bg1', 'assets/images/bg1.jpg');
        game.load.image('bg2', 'assets/images/bg2.png');
        game.load.image('bg3', 'assets/images/bg3.jpg');
        game.load.image('bgGameOver', 'assets/images/bgGameOver.jpeg');
        game.load.image('bgWin', 'assets/images/bgWin.jpg');
        game.load.image('pique', 'assets/images/pique.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
        game.load.image('enemy', 'assets/images/enemy.png');
        game.load.spritesheet('shuriken', 'assets/sprites/animshuriken.png', 40, 40);
        game.load.audio('bgsound', 'assets/audio/bgsound.mp3');
        game.load.audio('mortsound', 'assets/audio/mort.mp3');

        game.stage.backgroundColor = "#FFFFFF";
        var bar_vide = game.add.sprite(200,200, 'bar_vide');
        var bar_pleine = game.add.sprite(200,200, 'bar_pleine');
        game.load.setPreloadSprite(bar_pleine);
    },

    create: function ()
    {
        game.state.start('Menu');
    }

};
