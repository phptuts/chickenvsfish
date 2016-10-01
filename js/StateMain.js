var cursor, chicken, fishFoodGroup;

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

        fishFoodGroup = game.add.group();
        fishFoodGroup.scale.set(.05, .05);
        fishFoodGroup.setAll('anchor.x', 0.5);
        fishFoodGroup.setAll('anchor.y', 0.5);       
        fishFoodGroup.setAll('checkWorldBounds', true);   
        fishFoodGroup.setAll('outOfBoundsKill', true);
        fishFoodGroup.enableBody = true;

        game.physics.arcade.enable([chicken, fishFoodGroup]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;
        fishFoodGroup.setAll('body.velocity.x', 400);
        cursor = game.input.keyboard.createCursorKeys();
        
        game.time.events.loop(Phaser.Timer.SECOND *1, this.createFish, this);

    },

    destroyFish: function(fish) {
        fish.kill();
    },

    createFish: function() {
        console.log(game.rnd.integerInRange(1000, 6000));
        console.log(game.rnd.integerInRange(1000, 6000));
        var fish =  fishFoodGroup.create(game.rnd.integerInRange(1000, 6000),game.rnd.integerInRange(1000, 6000), 'clownfish');
        fish.body.collideWorldBounds = true;
        fish.body.velocity.x = 4000;

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