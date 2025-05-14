document.addEventListener("DOMContentLoaded", () => {
  fetch("api/medikamente_abrufen.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("medikamentenListe");

      if (data.status === "success" && data.data.length > 0) {
        data.data.forEach(med => {
          const item = document.createElement("div");
          item.className = "checkbox-container"; // gleiche Optik wie bei index.html
          item.style.cursor = "pointer";

          const label = document.createElement("label");
          label.innerHTML = `<b>${med.name} ${med.dosierung}</b>`;

          item.appendChild(label);
          item.onclick = () => {
            window.location.href = `hinzufuegen.html?id=${med.id}`;
          };

          container.appendChild(item);
        });
      } else {
        container.textContent = "Keine Medikamente vorhanden.";
      }
    })
    .catch(err => {
      console.error("Fehler beim Abrufen:", err);
      document.getElementById("medikamentenListe").textContent = "Fehler beim Laden.";
    });
});
