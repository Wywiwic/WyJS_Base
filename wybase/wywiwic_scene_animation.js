"use strict";

/* Animation global variables */
let globalAngle = 0;

/* Draw a simple sinus message */
function drawAnimatedMessage(message)
{
    /* Set the font */
    context.save();
    context.font = "18pt C64_Pro_Mono-STYLE";
    context.fillStyle = "white";
    context.textBaseline = "bottom";
    context.textAlign = "end";
    
    /* Set the text position & init local variables */
    const messageMetrics = context.measureText(message);
    const messageLength = message.length;
    const verticalAmplitude = 80;
    const sinusSpeed = 0.05;

    let positionX = screenWidthCenter - Math.ceil(messageMetrics.width / 2);
    let letterAngle = globalAngle;

    /* Display the text */
    for(let counter = 0; counter < messageLength; counter++)
    {
        const positionY = Math.sin(letterAngle) * verticalAmplitude;
        context.fillText(message.at(counter), positionX, screenHeightCenter + positionY);
        const charMetrics = context.measureText(message.at(counter));
        positionX += charMetrics.width;
        letterAngle += sinusSpeed;
        if (letterAngle >= 360)
            letterAngle -= 360;
    }

    /* Update the angle */
    globalAngle += sinusSpeed;
    if (globalAngle >= 360)
        globalAngle -= 360;

    /* Restore the context */
    context.restore();
};