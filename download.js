// download.js

// Function to download the extracted part as an image file
function downloadImage(dataUrl, filename) {
    // Create a new anchor (<a>) element
    const link = document.createElement('a');
    // Set the href attribute of the anchor to the data URL (image data)
    link.href = dataUrl;
    // Set the download attribute of the anchor to specify the filename for the downloaded image
    link.download = filename;
    // Programmatically trigger a click event on the anchor to start the download
    link.click();
}
