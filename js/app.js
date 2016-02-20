/**
 * Created by Timothy on 2/19/2016.
 * This is a compass example using the Cordova plugin.
 */

var renderer = PIXI.autoDetectRenderer(window.screen.width, window.screen.height, {backgroundColor: 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/pics/simple_compass.png');

// create a new Sprite using the texture
var compass = new PIXI.Sprite(texture);

//resize the image.. if you want to -- you could leave it the same size
compass.scale.x -= 1.3;
compass.scale.y -= 1.3;


// center the sprite's anchor point
compass.anchor.x = 0.5;
compass.anchor.y = 0.5;

// move the sprite to the center of the screen
compass.position.x = 200;
compass.position.y = 150;

stage.addChild(compass);


document.addEventListener("deviceready", function () {
    // start animating
    animate();
}, false);


function animate() {
    requestAnimationFrame(animate);
    navigator.compass.getCurrentHeading(function (heading) {
        //need to convert from degrees to radian because that is what pixi uses to rotate img.
        // Convert to radian like this (heading.magneticHeading)/57.2958)
        compass.rotation = 6.28319 - ((heading.magneticHeading)/57.2958);//need to convert from degrees to radian
    }, function(error){
        console.log(error.code);
    });
    // render the container
    renderer.render(stage);
}