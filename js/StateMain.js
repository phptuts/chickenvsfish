var cursor, chicken, fishFoodGroup, scoreText, score = 0, animals = ['redfish', 'bluefish'], sharks;

var StateMain={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.image("chicken", "images/chicken.png");
       game.load.spritesheet("bluefish", "images/bluefish-h.png", 32, 20, 3);
       game.load.spritesheet("redfish", "images/redfish.png", 32, 20, 3);
       game.load.image("shark", "images/shark.png");
    },
    
    create:function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (screen.width>1500)
        {
            game.world.setBounds(-20, 0, 680, 575);
        }

        var background = game.add.image(0, 0, "background");
        
        chicken = game.add.sprite(100, 100, "chicken");
        chicken.scale.setTo(.2, .2);
        chicken.anchor.setTo(0.5, 0.5);

        fishFoodGroup = game.add.group();
        fishFoodGroup.setAll('anchor.x', 0.5);
        fishFoodGroup.setAll('anchor.y', 0.5);       
        fishFoodGroup.setAll('checkWorldBounds', true);   
        fishFoodGroup.setAll('outOfBoundsKill', true);
        fishFoodGroup.enableBody = true;

        sharks = game.add.group();
        sharks.setAll('anchor.x', 0.5);
        sharks.setAll('anchor.y', 0.5);       
        sharks.setAll('checkWorldBounds', true);   
        sharks.setAll('outOfBoundsKill', true);
        sharks.enableBody = true;


        game.physics.arcade.enable([chicken, fishFoodGroup, shark]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;
        chicken.body.immovable = true;

        cursor = game.input.keyboard.createCursorKeys();
        
        var style = { font: "bold 32px Arial", fill: "orange", boundsAlignH: "center", boundsAlignV: "middle" };
        var scoreTextLabel = game.add.text(game.world.centerX, game.world.centerY -260, "Score", style);
        scoreTextLabel.anchor.setTo(.5, .5);
        scoreText = game.add.text(game.world.centerX , game.world.centerY - 215, "0", style);
        scoreText.anchor.setTo(.5, .5);

        this.loops();

    },

    loops: function() {
        game.time.events.loop(Phaser.Timer.SECOND *1, this.createFish, this);
        game.time.events.loop(Phaser.Timer.SECOND *5, this.createShark, this);
    },

    createShark: function() {
        var xPosition = 0;
        var yPosition = game.rnd.integerInRange(100, 450);
        var fish =  fishFoodGroup.create(xPosition, yPosition, animalName);
        fish.checkWorldBounds = true;
        fish.body.outOfBoundsKill = true;
        fish.body.enableBody = true;

    },

    createFish: function() {
        
        var animalName = animals[game.rnd.integerInRange(0, animals.length -1)];
        var xPosition = 0;
        var yPosition = game.rnd.integerInRange(100, 450);
        var fish =  fishFoodGroup.create(xPosition, yPosition, animalName);
        fish.checkWorldBounds = true;
        fish.body.outOfBoundsKill = true;
        fish.body.enableBody = true;
        fish.animations.add('swim');
        fish.animations.play('swim', 6, true);
        fish.body.velocity.x = 20;

    },
    
    update:function()
    {       
        this.controls();
        game.physics.arcade.collide(chicken, fishFoodGroup, this.eatFish, null, this);
        game.physics.arcade.collide(chicken, sharks, this.eatFish, null, this);

    },

    eatFish(chicken, fish) {
        fish.kill();
        score += 1;
        scoreText.setText(score);
        console.log(score);

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