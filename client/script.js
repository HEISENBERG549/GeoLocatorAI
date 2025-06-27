async function submitImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://geolocatorai.onrender.com/predict", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    console.log("Received from server:", result);  // 👈 Debugging line

    document.getElementById('result').innerHTML = `
        🌐 Predicted Location:<br>
        Country: ${result.country}<br>
        Region: ${result.region}<br>
        Latitude: ${result.latitude}<br>
        Longitude: ${result.longitude}<br>
        Confidence: ${(result.confidence * 100).toFixed(1)}%
    `;
}

function submitFeedback(isAccurate) {
    const responseText = isAccurate 
        ? "✅ Thanks for your feedback!" 
        : "⚠️ Thanks for your feedback, we'll improve!";

    document.getElementById('feedback-response').innerText = responseText;

    // Optional: send feedback to server (not implemented)
    console.log("User feedback:", isAccurate);
}


