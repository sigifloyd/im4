document.addEventListener("DOMContentLoaded", () => {
    fetch("api/medikamente_abrufen.php") // wie bei index.js
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("medikamentenListe");
  
        if (data.status === "success" && data.data.length > 0) {
          data.data.forEach(med => {
            const btn = document.createElement("button");
            btn.textContent = `${med.name} ${med.dosierung}`;
            btn.style.margin = "0.5rem 0";
            btn.onclick = () => {
              window.location.href = `hinzufuegen.html?id=${med.id}`;
            };
            container.appendChild(btn);
          });
        } else {
          container.textContent = "Keine Medikamente gefunden.";
        }
      })
      .catch(err => {
        console.error("Fehler beim Abrufen:", err);
      });
  });
  