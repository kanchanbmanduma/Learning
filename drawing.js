// drawing.js

let drawing = false; // Variable to track if the user is drawing
let path = []; // Array to store the points drawn by the user

// Add an event listener for when the mouse button is pressed on the canvas
canvas.addEventListener('mousedown', () => {
    drawing = true; // Start drawing
    path = []; // Clear the path and start a new one
});

// Add an event listener for when the mouse button is released
canvas.addEventListener('mouseup', () => {
    drawing = false; // Stop drawing
    ctx.beginPath(); // Start a new path for the next drawing event

    if (selectedPart) {
        floodFill(mask, path); // Fill the selected part based on the path
        sendPixelCountToBackend(selectedPart, path.length);  // Send pixel count to the backend
    }
});

// Add an event listener for when the mouse moves on the canvas
canvas.addEventListener('mousemove', draw); // Call the draw function

// Function to draw on the canvas as the user moves the mouse
function draw(event) {
    if (!drawing || !selectedPart) return; // Only draw if drawing is active and a part is selected

    const x = event.offsetX; // Get the X coordinate relative to the canvas
    const y = event.offsetY; // Get the Y coordinate relative to the canvas

    ctx.lineWidth = 5; // Set the line width
    ctx.lineCap = 'round'; // Set the line cap style to rounded
    ctx.strokeStyle = 'white'; // Set the stroke color to white

    ctx.lineTo(x, y); // Draw a line to the current mouse position
    ctx.stroke(); // Apply the stroke to draw the line
    ctx.beginPath(); // Start a new path
    ctx.moveTo(x, y); // Move to the current mouse position for the next draw

    path.push({ x, y }); // Store the current point in the path array
}
