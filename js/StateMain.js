var cursor, chicken, clownFishGroup;

var StateMain={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.image("chicken", "images/chicken.png");
       game.load.image("clownfish", "images/clownfish.png")
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

        clownFishGroup = game.add.group();
        clownFishGroup.scale.set(.05, .05);
        clownFishGroup.setAll('anchor.x', 0.5);
        clownFishGroup.setAll('anchor.y', 0.5);       
        clownFishGroup.setAll('checkWorldBounds', true);   
        clownFishGroup.setAll('outOfBoundsKill', true);

        clownFishGroup.create(30, 2230, 'clownfish');
        clownFishGroup.create(8000, 3430, 'clownfish');
        clownFishGroup.create(3000, 4630, 'clownfish');
        game.physics.arcade.enable([chicken, clownFishGroup]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;
        clownFishGroup.setAll('body.velocity.x', 400);

        cursor = game.input.keyboard.createCursorKeys();

    },

    destroyFish: function(fish) {
        fish.kill();
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