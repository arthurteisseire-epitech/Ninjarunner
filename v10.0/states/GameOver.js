var gameOverState = {

    preload : function () {

        game.load.image('route', 'assets/images/route.png');
        game.load.image('bg', 'assets/images/bg.png');
    },
    create : function(){

        game.stage.backgroundColor = "#FFFFFF";
        game.add.sprite(0, 0, 'bg');
        game.add.tileSprite(0, 480, 900, 40, 'route');

        if(score>=meilleurScore){

			meilleurScore = score;
            game.add.text(80, 30, 'Nouveau meilleur score 😀  Félicitations !', {
                font: '35px Arial',
                fill: '#000000'
            });
            game.add.text(80, 70, 'Votre score est de ' + score + ' points !', {
                font: '35px Arial',
                fill: '#000000'
            });
        }

        else{
            game.add.text(80, 30, 'Record : ' + meilleurScore, {
                font: '35px Arial',
                fill: '#000000'
            });
            game.add.text(80, 70, 'Vous êtes mort 😞 Votre score est de ' + score + ' points !', {
                font: '35px Arial',
                fill: '#000000'
            });

        }


        game.add.text(240, 350, 'Appuyez sur ENTRER pour rejouer !', {
            font: '35px Arial',
            fill: '#000000'
        });
    },
    update : function(){

        // On lui demande d'appuyer sur une touche (Entrer)1
        var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key.onDown.addOnce(this.restart, this);
    },
    restart: function () {
        game.state.start('Game');
    }
}
