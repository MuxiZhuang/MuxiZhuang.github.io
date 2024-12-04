// Drawing Pad Implementation
const canvas = document.getElementById("drawing-pad");
const ctx = canvas.getContext("2d");
let isDrawing = false;

// Set up canvas for drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
});

// Clear Canvas
document.getElementById("clear-canvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Submit Drawing and Comment
document.getElementById("submit-drawing").addEventListener("click", () => {
    const canvas = document.getElementById("drawing-pad");
    const comment = document.getElementById("comment").value;

    if (!comment.trim()) {
        alert("Please write a comment!");
        return;
    }

    const image = canvas.toDataURL("image/png");

    fetch("/save-image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, comment }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Your drawing and comment have been saved successfully!");
            } else {
                alert("Failed to save. Error: " + (data.error || "Unknown error."));
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
});
