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
        if (screen.width>1500)
        {
            game.world.setBounds(-20, 0, 660, 575);
        }

        var background = game.add.image(0, 0, "background");
        chicken = game.add.sprite(100, 100, "chicken");
        chicken.scale.setTo(.2, .2);
        chicken.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable([chicken]);
        chicken.body.collideWorldBounds = true;

        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;

        cursor = game.input.keyboard.createCursorKeys();

    },
    
    update:function()
    {       
        this.controls();
    },

    controls: function() {
        if (cursor.up.isDown) {
            chicken.body.velocity.y = -400;
        }

        if (cursor.down.isDown) {
            chicken.body.velocity.x = 0;
            chicken.body.velocity.y = 0;
        }
       
        if (cursor.right.isDown) {
            chicken.body.velocity.x = 400; 
            chicken.scale.setTo(.2, .2);           
        }

        if (cursor.left.isDown) {
            chicken.body.velocity.x = -400;
            chicken.scale.setTo(-.2, .2);
        }
    }    
    
};