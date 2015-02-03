window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var girl;
    var platforms;
    var walkSpeed = 150;
    var reunited;
    
    function preload() 
    {
        game.world.setBounds(0,0,1600, 600);
        
        game.load.spritesheet('girlChar', 'assets/ExGirl.png', 40, 40, 12 );
        game.load.image('plainBrick', 'assets/brickPlatform.png');
        game.load.image('foggySky', 'assets/foggyBackground.png');
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //girl.enableBody = true;
        
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
        game.add.sprite(0,0, 'foggySky');
        //game.stage.backgroundColor = '#2d2d2d';
        
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0,game.world.height - 64, 'plainBrick');
        ground.scale.setTo(.5,.5);
        ground.body.immovable = true;
        
        var ledge = platforms.create(400, 400, 'plainBrick');
        ledge.scale.setTo(.25,.25);
        ledge.body.immovable = true;
    
        
        
        // Create a sprite at the center of the screen using the 'logo' image.
      //  bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
      //  bouncy.anchor.setTo( 0.5, 0.5 );
        
        girl = game.add.sprite(32, game.world.height - 150, 'girlChar');
        game.physics.arcade.enable(girl);
        girl.body.bounce.y = 0.2;
        girl.body.gravity.y = 300;
        girl.body.collideWorldBounds = true;
        //girl.scale.set(2);
        
        girl.animations.add('left', [0, 1, 2], 10, true);
        girl.animations.add('down', [3, 4, 5], 10, true);
        girl.animations.add('up', [6, 7, 8], 10, true);
        girl.animations.add('right', [9, 10, 11], 10, true); 
        
       // walkRight.onStart.add(animationStarted, this);
       // walkRight.onLoop.add(animationLooped, this);
       //girl.animations.play('right', 10, true);

        
        
      //  girl.body.gravity.y = 300;
        cursors = game.input.keyboard.createCursorKeys();

        
        // Turn on the arcade physics engine for this sprite.
    //    game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
     //   bouncy.body.collideWorldBounds = true;
        
        game.camera.follow(girl);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);
    }
    
  /*  function animationStarted(sprite, animation) 
    {
        game.add.text(32, 32, 'Animation started', { fill: 'white' });
    }

    function animationLooped(sprite, animation) 
    {
        if (animation.loopCount === 1)
        {
            loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
        }
        else
        {
            loopText.text = 'Animation looped x2';
            animation.loop = false;
        }
    } */

    
    function update() 
    {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
     //   bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );\
        
    //    cursors = game.input.keyboard.createCursorKeys();
        
        game.physics.arcade.collide(girl, platforms);
        
        // girl.body.gravity.y = 300; 
        girl.body.velocity.x = 0;
         
         
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
         {
        //  Move to the left
             girl.body.velocity.x = (0 - walkSpeed);
             girl.animations.play('left');
             
         }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            //  Move to the right
            girl.body.velocity.x = walkSpeed;
            girl.animations.play('right');
        }
        else
        {
            //  Stand still
            girl.animations.stop();
            girl.frame = 4;
        } 
      /*  if(jump.isDown && player.body.touching.down)
        {
            girl.body.velocity.y = -300;
        } */
        
        //  Allow the player to jump if they are touching the ground.
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && girl.body.touching.down)
        {
            girl.body.velocity.y = -350;
        } 
             
     }
     
    function render() 
    {
        game.debug.soundInfo(reunited, 20, 32);
    }
};
