async function handleImageUpload(event) {
  const image = event.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("https://geolocatorai.onrender.com/predict", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  document.getElementById("result").innerText = `
    🌍 Predicted Location:
    Latitude: ${result.latitude}
    Longitude: ${result.longitude}
    Confidence: ${result.confidence}
  `;
}
