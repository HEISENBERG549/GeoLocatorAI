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
  document.getElementById('result').innerText = `Predicted location: ${result.location}`;
}
