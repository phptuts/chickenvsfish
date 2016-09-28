var cursor, chicken;

var StateMain={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.image("chicken", "images/chicken.png");
    },
    
    create:function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        var background = game.add.image(0, 0, "background");
        chicken = game.add.sprite(100, 100, "chicken");
        
        chicken.scale.setTo(.1, .1);
        chicken.anchor.setTo(.5, .5);
        game.physics.arcade.enable([chicken]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        cursor = game.input.keyboard.createCursorKeys();

    },
    
    update:function()
    {       
        if (cursor.up.isDown) {
            chicken.body.velocity.y = -400;
        }
        else {
            chicken.body.velocity.y = 0;
        }

        if (cursor.down.isDown) {
            chicken.body.velocity.x = 400;
        }
        else {
            chicken.body.velocity.x = 0;
        }

        if (cursor.left.isDown) {
            
        }

        if (cursor.right.isDown) {

        }
    }    
    
};