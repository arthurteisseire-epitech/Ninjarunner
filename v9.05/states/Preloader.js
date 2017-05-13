var preloaderState = {

    preload : function(){
        game.load.image('route', 'assets/images/route.png');
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('shuriken', 'assets/images/shuriken.png');
        game.load.image('pique', 'assets/images/pique.png');
        game.load.spritesheet('player', 'assets/sprites/anim.png', 150, 139, 60);
        game.load.audio('bgsound', 'assets/audio/bgsound.mp3');
        game.load.audio('mortsound', 'assets/audio/mort.mp3');
    },

    create : function(){
        game.state.start('Menu');

    }
}
