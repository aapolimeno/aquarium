

// console.log("Hello from JavaScript!");


// Get the canvas element and its context
const canvas = document.getElementById("aquariumCanvas");
const ctx = canvas.getContext("2d");



// FISHES

// Array to store fish objects 
const fishes = [];

// Function to add a fish to the array 
function addFish(bodyColor, bodyLength, bodyHeight, centerX, centerY, tailColor){
    fishes.push({
        bodyColor, 
        bodyLength, 
        bodyHeight, 
        centerX,    
        centerY,
        tailColor   
    }); 
}

// Function to draw a fish
function drawFish(fish) {
    // Body
    ctx.fillStyle = fish.bodyColor;
    ctx.beginPath();
    ctx.ellipse(
        fish.centerX,
        fish.centerY,
        fish.bodyLength / 2,
        fish.bodyHeight / 2,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();

    // Tail
    const tailWidth = fish.bodyLength / 4;
    const tailHeight = fish.bodyHeight / 2;
    ctx.fillStyle = fish.tailColor;
    ctx.beginPath();
    ctx.moveTo(fish.centerX - fish.bodyLength / 2, fish.centerY);
    ctx.lineTo(fish.centerX - fish.bodyLength / 2 - tailWidth, fish.centerY - tailHeight);
    ctx.lineTo(fish.centerX - fish.bodyLength / 2 - tailWidth, fish.centerY + tailHeight);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = "rgb(33, 33, 33)";
    ctx.beginPath();
    ctx.ellipse(
        fish.centerX + fish.bodyLength / 4,
        fish.centerY,
        fish.bodyHeight / 10,
        fish.bodyHeight / 10,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
}


// BUBBLES 

// Array to store bubble objects
const bubbles = [];

// Function to create and store a bubble
function createBubble(x, y, size, speed) {
    bubbles.push({
        x: x,
        y: y,
        size: size,
        speed: speed,
    });

    console.log(`Created bubble: x=${x}, y=${y}, size=${size}, speed=${speed}`);

}

// Function to draw a bubble
function drawBubble(bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 157, 207, 0.6)";
    ctx.fill();
    ctx.closePath();

}

// Function to update bubble positions (float upwards)
function updateBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].y -= bubbles[i].speed; // Move bubble upward


         if (bubbles[i].y + bubbles[i].size < 0) {
           bubbles.splice(i, 1); // Remove bubbles that float out of view
           i--; // Adjust index since we removed an element
        }
    }
}

// Function to animate the canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw all fish
    fishes.forEach(drawFish);

    // Update and draw all bubbles
    updateBubbles();
    bubbles.forEach(drawBubble);

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Event listener for mouse movement
function spawnBubblesOnMouseMove(interval) {
    let lastSpawnTime = 0;

    canvas.addEventListener("mousemove", (event) => {
        const now = Date.now();
        if (now - lastSpawnTime >= interval) { // Spawn bubbles at the specified interval
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left; // Mouse position relative to canvas
            const y = event.clientY - rect.top;
            const size = Math.random() * 10 + 4; // Random size (5-15px)
            const speed = Math.random() * 1 + 0.5; // Random upward speed (0.5-1.5px per frame)
            createBubble(x, y, size, speed);
            lastSpawnTime = now;
        }
    });
}

// Add fish to the aquarium
addFish("#ff4500", 100, 50, 200, 200, "#ff4500");
addFish("#ff6347", 50, 25, 300, 300, "#ff6347");
addFish("#ff7f50", 75, 40, 100, 250, "#ff7f50");
addFish("#ff8c00", 150, 75, 400, 100, "#ff8c00");

// Start the animation and interaction
animate();
spawnBubblesOnMouseMove(100); // Spawn bubbles every 100ms
