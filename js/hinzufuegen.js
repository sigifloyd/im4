const urlParams = new URLSearchParams(window.location.search);
const medId = urlParams.get("id");

// Titel dynamisch anpassen (H1/H2)
document.addEventListener("DOMContentLoaded", () => {
  if (medId) {
    const title = document.getElementById("form-title");
    const subtitle = document.getElementById("form-subtitle");

    if (title) title.textContent = "Bearbeiten";
    if (subtitle) subtitle.textContent = "Medikament bearbeiten oder löschen.";
  }

  // Frequenzwahl & Wochentage: Aktivieren/Deaktivieren
  const frequenzRadios = document.querySelectorAll('input[name="frequenz"]');
  const wochentagCheckboxes = document.querySelectorAll('.wochentag-checkbox');

  function toggleWochentage(enable) {
    wochentagCheckboxes.forEach(cb => {
      cb.disabled = !enable;
      if (!enable) cb.checked = false;
    });
  }

  // Beim ersten Laden prüfen
  const checked = document.querySelector('input[name="frequenz"]:checked');
  if (checked && checked.value !== "individuell") {
    toggleWochentage(false);
  }

  // Event Listener für Änderung
  frequenzRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      toggleWochentage(radio.value === "individuell");
    });
  });
});


// Formular absenden (speichern)
document.getElementById("hinzufuegenForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  if (medId) {
    formData.append("id", medId); // ID fürs Update mitsenden
  }

  const endpoint = medId ? "api/medikament_update.php" : "api/hinzufuegen.php";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const reply = await res.text();
    console.log("Antwort vom Server:\n" + reply);

    if (reply.trim() === "success") {
      window.location.href = "index.html";
    } else {
      alert("Fehler: " + reply);
    }
  } catch (err) {
    console.error("Fehler beim Senden:", err);
    alert("Es ist ein Fehler aufgetreten.");
  }
});


// Wenn im Bearbeitungsmodus: Daten laden
if (medId) {
  fetch(`api/medikament_details.php?id=${medId}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        const med = data.med;
        document.getElementById("name").value = med.name;
        document.getElementById("form").value = med.form;
        document.getElementById("dosierung").value = med.dosierung;
        document.getElementById("startdatum").value = med.startdatum;
        document.getElementById("einnahmezeit").value = med.einnahmezeit;
        document.getElementById("einnahmestop").value = med.einnahmestop || '';
        document.getElementById("hinweis").value = med.hinweis || '';
        document.getElementById("zweck").value = med.zweck || '';
        document.getElementById("packungsgroesse").value = med.packungsgroesse;
        document.getElementById("ablaufdatum").value = med.ablaufdatumPackung;

        // Optional: Wochentage vorauswählen
        if (med.wochentage) {
          med.wochentage.split(',').forEach(tag => {
            const checkbox = document.querySelector(`input[name="wochentage[]"][value="${tag}"]`);
            if (checkbox) checkbox.checked = true;
          });
        }

        // Löschbutton anzeigen
        const löschenBtn = document.getElementById("deleteButton");
        if (löschenBtn) löschenBtn.style.display = "block";
      }
    })
    .catch(err => console.error("Fehler beim Laden:", err));
}

// Medikament löschen
document.getElementById("deleteButton").addEventListener("click", async () => {
  if (!medId) return;

  const confirmDelete = confirm("Möchtest du dieses Medikament wirklich löschen?");
  if (!confirmDelete) return;

  try {
    const res = await fetch("api/medikament_loeschen.php", {
      method: "POST",
      body: new URLSearchParams({ id: medId })
    });

    const reply = await res.text();
    if (reply.trim() === "success") {
      window.location.href = "index.html";
    } else {
      alert("Fehler: " + reply);
    }
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    alert("Netzwerkfehler");
  }
});
