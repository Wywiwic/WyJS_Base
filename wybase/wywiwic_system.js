"use strict";

/* Global variables */
let debug       = true;
let debugXY     = false;

/* Demo variables */
let mouseX      = 0;
let mouseY      = 0;
let touchX      = 0;
let touchY      = 0;

let mousePressedLeft    = false;
let mousePressedMiddle  = false;
let mousePressedRight   = false;
let mouseClickLeft      = false;
let mouseClickMiddle    = false;
let mouseClickRight     = false;
let touchPressed        = false;

function getInfo(title)
{
    if (debug)
    {
        console.log(title + "-> INFO");
        console.log("Ratio init: ", ratio);
        console.log("screenWidth: ", screenWidth);
        console.log("screenHeight: ", screenHeight);

        console.log("window.devicePixelRatio: ", window.devicePixelRatio);
        console.log("window.innerWidth: ", window.innerWidth);
        console.log("window.innerHeight: ", window.innerHeight);
        console.log("window.outerWidth: ", window.outerWidth);
        console.log("window.outerHeight: ", window.outerHeight);

        console.log("window.screen.width: ", window.screen. width);
        console.log("window.screen.height: ", window.screen.height);

        console.log("window.screen.availWidth: ", window.screen.availWidth);
        console.log("window.screen.availHeight: ", window.screen.availHeight);

        console.log("window.visualViewport.width: ", window.visualViewport.width);
        console.log("window.visualViewport.height: ", window.visualViewport.height);

        console.log("window.visualViewport.pageLeft: ", window.visualViewport.pageLeft);
        console.log("window.visualViewport.pageTop: ", window.visualViewport.pageTop);

        console.log("window.visualViewport.offsetLeft: ", window.visualViewport.offsetLeft);
        console.log("window.visualViewport.offsetTop: ", window.visualViewport.offsetTop);

        console.log("window.visualViewport.scale: ", window.visualViewport.scale);
    }
};

/* Get mouse position */
function getMousePosition(canvas, evt)
{
    let rect = this.getBoundingClientRect();

    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

/* Get mouse move */
function onMouseMove(evt)
{
    mouseX = evt.clientX;
    mouseY = evt.clientY;

    if (debugXY) { console.log( "onMouseMove(evt) -> " + "mouseX=" + mouseX + " / mouseY=" + mouseY); };

    moveOnCanvas(evt);

    return false;
};

/* Get mouse click */
function onMouseClick(evt)
{
    if (debug) { console.log("onMouseClick(evt) -> " + "evt.button: " + evt.button); };

    if (evt.button == 0)
        mouseClickLeft  = true;
    else if (evt.button == 1)
        mouseClickMiddle= true;
    else if (evt.button == 2)
        mouseClickRight = true;

    clickOnCanvas(evt);

    return false;
};

/* Get mouse down */
function onMouseDown(evt)
{
    if (debug) { console.log("onMouseDown(evt) -> " + "evt.button: " + evt.button); };

    if (evt.button == 0)
        mousePressedLeft  = true;
    else if (evt.button == 1)
        mousePressedMiddle= true;
    else if (evt.button == 2)
        mousePressedRight = true;

    return false;
};

/* Get mouse up */
function onMouseUp(evt)
{
    if (debug) { console.log("onMouseUp(evt) -> " + "evt.button: " + evt.button); };

    if (evt.button == 0)
        mousePressedLeft  = false;
    else if (evt.button == 1)
    {
        if (debugXY)
            debugXY = false;
        else
            debugXY = true;

        mousePressedMiddle= false;
    }
    else if (evt.button == 2)
    {
        if (debug)
            debug = false;
        else
        {
            console.clear();
            logs.splice(0, logs.length);
            debug = true;
        }
        mousePressedRight = false;
    }

    return false;
};

/* Draw something when a touch start is detected */
function onTouchStart(evt)
{
    if (debug) { console.log("onTouchStart(evt)"); };

    touchPressed = true;

    /* Update the touch co-ordinates */
    getTouchPos(evt);

    touchOnCanvas(evt);

    /* Prevents an additional mousedown event being triggered */
    evt.preventDefault();
    return false;
};

/* Draw something and prevent the default scrolling when touch movement is detected */
function onTouchMove(evt)
{
    if (debugXY) { console.log("onTouchMove(evt)"); };

    /* Update the touch co-ordinates */
    getTouchPos(evt);

    touchOnCanvas(evt);

    return false;
};

function onTouchEnd(evt)
{
    if (debug) { console.log("onTouchEnd(evt)"); };

    touchOnCanvas(evt);

    return false;
};

function getTouchPos(evt)
{
    let touch = evt.touches[0];
    let rect = canvas.getBoundingClientRect();
    touchX = (touch.clientX - rect.left) / (rect.right - rect.left) * canvas.width;    
    touchY = (touch.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    mouseX = -1;
    mouseY = -1;
};