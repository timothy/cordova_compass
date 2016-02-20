/**
 * Created by Timothy on 2/19/2016.
 * This is a compass example without using the Cordova plugin.
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
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientation is supported");
        animate();
    }else{
        console.log("DeviceOrientation is NOT supported");
    }
}, false);


window.addEventListener('deviceorientation', function(eventData) {
    //need to convert from degrees to radian because that is what pixi uses to rotate img.
    //Convert to radian like this (heading.magneticHeading)/57.2958)

    // gamma is the left-to-right tilt in degrees, where right is positive
    //eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    // eventData.beta;
     console.log(eventData.alpha);
    // alpha is the compass direction the device is facing in degrees
    compass.rotation = ((eventData.alpha)/57.2958);

}, false);

function animate() {
    requestAnimationFrame(animate);

    // render the container
    renderer.render(stage);
}
