const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.getElementById("medikamentDetails").innerHTML = "<p>Fehler: Keine Medikamenten-ID übergeben.</p>";
} else {
  fetch(`api/medikament_details.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        const med = data.med;

        document.getElementById("medikamentName").textContent = `${med.name} ${med.dosierung}`;

        const details = `
          <p><strong>Medikamentenform</strong><br>${med.form}</p>
          <p><strong>Dosierung / Menge</strong><br>${med.dosierung} Stück pro Einnahme</p>
          <p><strong>Einnahmefrequenz</strong><br>${med.frequenz}${med.einnahmezeit ? `, ${med.einnahmezeit.slice(0, 5)} Uhr` : ''}</p>
          <p><strong>Zeitraum</strong><br>${formatDate(med.startdatum)} bis ${formatDate(med.einnahmestop)}</p>
          <p><strong>Hinweise</strong><br>${med.hinweis || '-'}</p>
          <p><strong>Kategorie / Zweck</strong><br>${med.zweck || '-'}</p>
          <p><strong>Ablaufdatum</strong><br>${formatDate(med.ablaufdatumPackung)}</p>
        `;

        document.getElementById("medikamentDetails").innerHTML = details;
      } else {
        document.getElementById("medikamentDetails").innerHTML = `<p>Fehler: ${data.message}</p>`;
      }
    });
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("de-CH", { day: "numeric", month: "long", year: "numeric" });
}
