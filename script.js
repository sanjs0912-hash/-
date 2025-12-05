//work w html
async function sendTollava() {
  const prompt = document.getElementById("prompt").value;
  const file = document.getElementById("mediaInput").files[0];

  const formData = new FormData();
  formData.append("prompt", prompt);
  if (file) formData.append("file", file);

  const res = await fetch("https://YOUR-BACKEND-URL.workers.dev/api", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("response").innerText = data.output;
}
