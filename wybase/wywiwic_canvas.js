"use strict";

/* Canvas global variables */
let swapFb  = false;
let visibleCanvas;
let hiddenCanvas;
let canvasOne;
let canvasTwo;

let canvas;
let context;
let ratio           = window.devicePixelRatio;
let screenWidth     = Math.round(window.innerWidth * ratio);
let screenHeight    = Math.round(window.innerHeight * ratio);
let screenWidthCenter   = Math.floor(screenWidth/2);
let screenHeightCenter  = Math.floor(screenHeight/2);

let isLandscape     = true;
let maxRadius       = 1;

let canvasObjects   = [];

let canvasBackgroundColor = '#000000';

/* Initialization function */
function initCanvas()
{
    getInfo("initCanvas()");

    document.addEventListener('contextmenu', event => event.preventDefault());

    /* Initialize Canvas 1 */
    canvas = document.getElementById("canvasOne");
    canvasOne = canvas;
    canvas.className = "canvasFullWindow";
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    canvas.addEventListener("mousemove", function(event) {onMouseMove(event);});
    canvas.addEventListener('mousedown', function(event) {onMouseDown(event);});
    canvas.addEventListener('mouseup', function(event) {onMouseUp(event);});
    canvas.addEventListener("click", function(event) {onMouseClick(event);});

    canvas.addEventListener('touchstart', function(event) {onTouchStart(event);}, { passive: false });
    canvas.addEventListener('touchmove', function(event) {onTouchMove(event);}, { passive: false });
    canvas.addEventListener('touchend', function(event) {onTouchEnd(event);}, { passive: false });

    context=canvas.getContext('2d');
    context.scale((ratio), (ratio));

    /* Initialize Canvas 2 */
    canvas = document.getElementById("canvasTwo");
    canvasTwo = canvas;
    canvas.className = "canvasFullWindow";
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    canvas.addEventListener("mousemove", function(event) {onMouseMove(event);});
    canvas.addEventListener('mousedown', function(event) {onMouseDown(event);});
    canvas.addEventListener('mouseup', function(event) {onMouseUp(event);});
    canvas.addEventListener("click", function(event) {onMouseClick(event);});

    canvas.addEventListener('touchstart', function(event) {onTouchStart(event);}, { passive: false });
    canvas.addEventListener('touchmove', function(event) {onTouchMove(event);}, { passive: false });
    canvas.addEventListener('touchend', function(event) {onTouchEnd(event);}, { passive: false });

    context=canvas.getContext('2d');
    context.scale((ratio), (ratio));

    /* Setup the resize */
    onResize();

    window.addEventListener('resize', onResizeHandler, false);
    window.onresize = onResizeHandler;

    drawAnimation();
};

/* requestAnimFrame callback */
window.requestAnimFrame = (function(callback) {
    let id = window.setTimeout(callback, 1000 / 60);
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){};
})();

/* Resize event callback */
function onResizeHandler(evt)
{
    onResize();
};

/* Resize function */
function onResize()
{
    ratio = window.devicePixelRatio;
    screenWidth         = Math.round(window.innerWidth * ratio);
    screenHeight        = Math.round(window.innerHeight * ratio);
    screenWidthCenter   = Math.floor(screenWidth / 2);
    screenHeightCenter  = Math.floor(screenHeight / 2);

    computeOrientation();

    if (screenWidth >= screenHeight)
    {
        maxRadius = Math.floor(screenHeight/2);
        if (debug) { console.log("Vertical maxRadius: " + maxRadius); }
    }
    else
    {
        maxRadius = Math.floor(screenWidth/2);
        if (debug) { console.log("Horizontal maxRadius: " + maxRadius); }
    }

    canvasOne.width     = screenWidth;
    canvasOne.height    = screenHeight;
    canvasTwo.width     = screenWidth;
    canvasTwo.height    = screenHeight;

    /* Get the canvas context */
    context=canvasOne.getContext('2d');
    context.scale((ratio), (ratio));

    mainResize();

    sceneResize();
};

/* Start the double buffering process */
function doublebufferingBegin()
{
    if (swapFb === false)
    {
        visibleCanvas = canvasOne;
        hiddenCanvas = canvasTwo;
        swapFb = true;
    }
    else
    {
        visibleCanvas = canvasOne;
        hiddenCanvas = canvasTwo;
        swapFb = false;
    }

    canvas = hiddenCanvas;

    /* Get the canvas context */
    context=canvas.getContext('2d');
};

/* Swap the double buffering process */
function doublebufferingEnd()
{
    visibleCanvas.style.visibility='hidden';
    visibleCanvas.style.display='none';
    hiddenCanvas.style.visibility='visible';
    hiddenCanvas.style.display='block';
};

/* Clear the canvas */
function clearCanvas()
{
    context.fillStyle = canvasBackgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
};

/* Compute the screen orientation -> Landscape/Portrait */
function computeOrientation()
{
    isLandscape = screenWidth > screenHeight ?  true : false;
};

function checkCanvasObjects(evt)
{
    /* Check & update all GUI objects properties*/
    canvasObjects.forEach((element) =>
    {
        element.events(context);
    });
};

function clickOnCanvas(evt)
{
    /* Check & update all GUI objects properties*/
    canvasObjects.forEach((element) =>
    {
        element.events(evt);
    });

    mouseClickLeft  = false;
    mouseClickMiddle= false;
    mouseClickRight = false;
};

function touchOnCanvas(evt)
{
    /* Check & update all GUI objects properties*/
    canvasObjects.forEach((element) =>
    {
        element.touchEvents(evt);
    });
};

function moveOnCanvas(evt)
{
    /* Check & update all GUI objects properties*/
    canvasObjects.forEach((element) =>
    {
        element.events(evt);
    });
};

function isPointInRectangle(pointX, pointY, rectX, rectY, rectWidth, rectHeight)
{
    let isInRectangle = false;

    if (pointX >= rectX &&
        pointX <= rectX + rectWidth &&
        pointY >= rectY &&
        pointY <= rectY + rectHeight)
    {
        isInRectangle = true;
    }

    return isInRectangle;
};