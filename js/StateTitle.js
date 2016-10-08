WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, StateTitle.createText, StateTitle); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Pacifico']
    }

};
var start;
var StateTitle={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    },
    
    create:function()
    {
        var background = game.add.image(0, 0, "background");
        background.height = game.height;
        background.width = game.width;
        
    },
    
    update:function()
    {       
        
    },

    createText: function() 
    {
        var style = { font: "bold 80px Pacifico", fill: "orange", boundsAlignH: "center", boundsAlignV: "middle" };
        var title = game.add.text(game.world.centerX, game.world.centerY -95, "Chicken Vs Fish", style);
        title.anchor.setTo(.5, .5);

        start = game.add.text(game.world.centerX, game.world.centerY, "Start", style);
        start.fontSize = '50px';
        start.anchor.setTo(.5, .5);
        start.inputEnabled = true;
        start.events.onInputDown.add(this.startGame, this);
    },

    startGame: function() {
        game.state.start("StateMain");
    }    
    
};