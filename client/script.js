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
  document.getElementById('result').innerText =
  `🌍 Predicted Location:
Country: ${result.country}
Region: ${result.region}
Latitude: ${result.latitude}
Longitude: ${result.longitude}
Confidence: ${(result.confidence * 100).toFixed(1)}%`;

}
function submitFeedback(isAccurate) {
  const responseText = isAccurate ? "Thanks for your feedback! ✅" : "Thanks for your feedback. We'll improve! ⚠️";
  document.getElementById("feedback-response").innerText = responseText;

  // Optional: send feedback to server or log to console
  console.log("User feedback:", isAccurate);
}

