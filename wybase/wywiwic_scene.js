"use strict";

/* Scene global variables */
let iconImage;
let iconLoaded = false;

/* Draw all GUI objects to the scene */
function drawGuiObjects()
{
    canvasObjects.forEach((element) =>
    {
        element.draw(context);
    });
};

/* Init the scene */
async function initScene()
{
    iconImage = new Image();
    iconImage.src = "pictures/pointer.png";

    iconImage.onload = function()
    {
        if (debug) { console.log("Success! The icon is loaded and ready.") };
        iconLoaded = true;
    };

};

/* Draw the icon */
function drawIcon()
{
    if (iconLoaded)
    {
        let iconSize = 128 * ratio;
        let iconRatio = iconImage.width / iconSize;
        let iconOffsetX = (iconSize/2)*ratio;
        let iconOffsetY = (185/iconRatio*ratio);
        if (mouseX === -1)
            context.drawImage(iconImage, touchX - iconOffsetX, touchY - iconOffsetY, iconSize, iconSize);
        else
            context.drawImage(iconImage, mouseX - iconOffsetX, mouseY - iconOffsetY, iconSize, iconSize);
    }
};

/* Draw the scene */
function drawScene()
{
    /* Draw all GUI objects to the scene */
    drawGuiObjects();

    /* Draw the landmarks */
    drawCenteredLines();

    /* Draw the animation */
    drawAnimatedMessage("Move your mouse or touch the screen");

    /* Draw the icon */
    drawIcon();

    /* Draw the helpers */
    /* Write Orientation */
    let info = Math.round(screenWidth) + " / " + Math.round(screenHeight);
    if (iconLoaded)
        info = "Landscape (" + info + ")";
    else
        info = "Portrait (" + info + ")";
    drawMessageTopLeft(info);

    /* Write Coordinates */
    if (mouseX === -1)        
        info = Math.round(touchX) + " / " + Math.round(touchY);
    else
        info = Math.round(mouseX) + " / " + Math.round(mouseY);
    drawMessageBottomRight(info);
};

/* Update position & size of objects on the scene */
function sceneResize()
{
    drawGuiObjects();
};
