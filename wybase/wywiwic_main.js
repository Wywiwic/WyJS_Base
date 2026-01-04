"use strict";

/* Initialization function */
function initialize()
{
    /* Initialize the canvas */
    initCanvas();

    /* Initialize the scene */
    initScene();

    /* Initialize the first size */
    onResize();
};

/* Update system & global variables */
function mainResize()
{
};

/* Draw the frame */
function drawAnimation()
{
    /* Double-buffering */
    doublebufferingBegin();

    /* Clear the canvas */
    clearCanvas();

    /* Draw the scene */
    drawScene();

    /* Double-buffering end */
    doublebufferingEnd();

    /* Request a new frame */
    requestAnimFrame(function(){drawAnimation();});
};