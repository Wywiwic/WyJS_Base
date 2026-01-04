"use strict";

/* Scene global variables */
const messageMargin = 2;

/* Draw a centered cross */
function drawCenter()
{
    let arrowSize = 20;

    context.save();
    context.beginPath();
    context.moveTo(screenWidthCenter-arrowSize, screenHeightCenter);
    context.lineTo(screenWidthCenter+arrowSize, screenHeightCenter);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();

    context.beginPath();
    context.moveTo(screenWidthCenter, screenHeightCenter-arrowSize);
    context.lineTo(screenWidthCenter, screenHeightCenter+arrowSize);
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.stroke();
    context.restore();
};

/* Draw centered lines */
function drawCenteredLines()
{
    context.save();
    context.beginPath();
    context.moveTo(0, screenHeightCenter);
    context.lineTo(screenWidth, screenHeightCenter);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();

    context.beginPath();
    context.moveTo(screenWidthCenter, 0);
    context.lineTo(screenWidthCenter, screenHeight);
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.stroke();

    context.beginPath();
    context.moveTo(screenWidth, 0);
    context.lineTo(0, screenHeight);
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    context.stroke();
    context.restore();
};

/* Draw centered diagonals*/
function drawCenteredDiagonals()
{
    context.save();
    context.imageSmoothingEnabled = false;
    context.beginPath();
    context.lineWidth =2;
    context.moveTo(0,0);
    context.lineTo(screenWidthCenter, screenHeightCenter);
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth =2;
    context.moveTo(0,screenHeight);
    context.lineTo(screenWidthCenter, screenHeightCenter);
    context.fillStyle = "green";
    context.strokeStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth =2;
    context.moveTo(screenWidth,screenHeight);
    context.lineTo(screenWidthCenter, screenHeightCenter);
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth =2;
    context.moveTo(screenWidth,0);
    context.lineTo(screenWidthCenter, screenHeightCenter);
    context.fillStyle = "white";
    context.strokeStyle = "white";
    context.fill();
    context.stroke();
    context.restore();
};

/* Write a top-left message on the specific canvas */
function drawMessageTopLeft(message)
{
    context.save();
    context.font = "18pt saira-stencil-one";

    context.fillStyle = "white";
    context.textBaseline = "top";
    context.textAlign = "left";
    context.fillText(message, messageMargin, messageMargin);
    context.restore();
};

/* Write a bottom-right message on the specific canvas */
function drawMessageBottomRight(message)
{
    context.save();
    context.font = "18pt saira-stencil-one";
    context.fillStyle = "white";
    context.textBaseline = "bottom";
    context.textAlign = "end";
    context.fillText(message, screenWidth - messageMargin, screenHeight - messageMargin);
    context.restore();
};