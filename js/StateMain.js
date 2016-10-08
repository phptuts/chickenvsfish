var cursor, chicken, fishFoodGroup, scoreText, score = 0, badGuys, badGuyNames = ['shark', 'snake'], animals = ['redfish', 'bluefish', 'colorfish'];

var StateMain={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.image("chicken", "images/chicken.png");
       game.load.spritesheet("bluefish", "images/bluefish.png", 32, 20, 3);
       game.load.spritesheet("redfish", "images/redfish.png", 31, 18, 3);
       game.load.spritesheet("colorfish", "images/colorfish.png", 31, 23, 3);
       game.load.spritesheet("snake", "images/snake.png", 32, 17, 3);
       game.load.image("shark", "images/shark.png");
    },
    
    create:function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        

        var background = game.add.image(0, 0, "background");
        background.height = game.height;
        background.width = game.width;
        
        chicken = game.add.sprite(100, 100, "chicken");
        chicken.scale.setTo(.1, .1);
        chicken.anchor.setTo(0.5, 0.5);
        
        fishFoodGroup = game.add.group();
        fishFoodGroup.setAll('anchor.x', 0.5);
        fishFoodGroup.setAll('anchor.y', 0.5);       
        fishFoodGroup.setAll('checkWorldBounds', true);   
        fishFoodGroup.setAll('outOfBoundsKill', true);
        fishFoodGroup.enableBody = true;

        badGuys = game.add.group();
        badGuys.setAll('anchor.x', 0.5);
        badGuys.setAll('anchor.y', 0.5);       
        badGuys.setAll('checkWorldBounds', true);   
        badGuys.setAll('outOfBoundsKill', true);
        badGuys.enableBody = true;

        game.physics.arcade.enable([chicken, fishFoodGroup, badGuys]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;
        chicken.body.immovable = true;

        cursor = game.input.keyboard.createCursorKeys();
        
        var style = { font: "bold 42px Pacifico", fill: "orange", boundsAlignH: "center", boundsAlignV: "middle" };
        var scoreTextLabel = game.add.text(game.world.centerX, game.world.centerY -175, "Score", style);
        scoreTextLabel.anchor.setTo(.5, .5);
        scoreText = game.add.text(game.world.centerX , game.world.centerY - 135, "0", style);
        scoreText.anchor.setTo(.5, .5);

        this.loops();

    },

    loops: function() {
        game.time.events.loop(Phaser.Timer.SECOND *1, this.createFish, this);
        game.time.events.loop(Phaser.Timer.SECOND *3, this.createEnemy, this);
    },

    createEnemy : function() {
        var name = badGuyNames[game.rnd.integerInRange(0, badGuyNames.length -1)];
        var xPosition = 0;
        var yPosition = game.rnd.integerInRange(100, 400);
        var enemy =  badGuys.create(xPosition, yPosition, name);
        enemy.checkWorldBounds = true;
        enemy.body.outOfBoundsKill = true;
        enemy.body.enableBody = true;

        if ('shark' == name) {
            this.createShark(enemy);
        }
        else if ('snake' == name) {
            this.createSnake(enemy);
        }

    },

    createShark: function(shark) {
        shark.scale.setTo(-.3, .3);
        shark.body.velocity.x = 90;
    },

    createSnake: function(snake) {
        snake.scale.setTo(2, 2);
        snake.animations.add('snake_move', [0,1,2]);
        snake.animations.play('snake_move', 12, true);
        snake.body.velocity.x = 80;
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
        game.physics.arcade.collide(chicken, badGuys, this.loseGame, null, this);

    },

    eatFish(chicken, fish) {
        fish.kill();
        score += 1;
        scoreText.setText(score);
    },

    loseGame: function(chicken, badGuy) {
        alert("You lost game!");
        game.state.start("StateTitle");
        score = 0;
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
            chicken.scale.setTo(.1, .1);           
        }

        if (cursor.left.isDown) {
            chicken.body.velocity.x = -400;
            chicken.scale.setTo(-.1, .1);
        }
    }    
    
};