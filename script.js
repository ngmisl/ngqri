function generateQRCode(size = 400) {
  const url = document.querySelector('input[name="url"]').value;
  const payload = JSON.stringify({ url, size }); // Serialize data as JSON

  fetch("https://ngqri.onrender.com/generate_qr", {
    method: "POST",
    body: payload, // Use the serialized JSON payload
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const qrImage = URL.createObjectURL(blob);

      const qrImageElement = document.createElement("img");
      qrImageElement.src = qrImage;

      document.getElementById("qr_image").innerHTML = "";
      document.getElementById("qr_image").appendChild(qrImageElement);

      // Show download links after generating QR code
      document.getElementById("download_links").style.display = "block";
    });
}

function downloadQRCode(size) {
  const url = document.querySelector('input[name="url"]').value;
  const payload = JSON.stringify({ url, size }); // Serialize data as JSON

  fetch("https://ngqri.onrender.com/generate_qr", {
    method: "POST",
    body: payload, // Use the serialized JSON payload
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const qrImage = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = qrImage;
      link.download = `qrcode_${size}x${size}.png`;
      link.click();
    });
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  generateQRCode();
});
