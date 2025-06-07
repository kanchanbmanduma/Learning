// extraction.js

// Function to extract the selected part from the canvas using a mask
function extractPart(mask, part) {
    // Create a new canvas element to draw the extracted part
    const partCanvas = document.createElement('canvas');
    // Set the width of the new canvas to match the main canvas
    partCanvas.width = canvas.width;
    // Set the height of the new canvas to match the main canvas
    partCanvas.height = canvas.height;
    // Get the 2D drawing context of the new canvas
    const partCtx = partCanvas.getContext('2d');

    // Draw the mask onto the new canvas
    partCtx.putImageData(mask, 0, 0);
    // Set the composite operation to 'source-in' to keep only the overlapping area between the mask and the canvas
    partCtx.globalCompositeOperation = 'source-in';
    // Draw the original image onto the new canvas
    partCtx.drawImage(canvas, 0, 0);

    // Return the data URL of the canvas, which represents the extracted part as a PNG image
    return partCanvas.toDataURL();
}
