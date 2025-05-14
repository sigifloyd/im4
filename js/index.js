console.log("Index JavaScript geladen");

const weekdayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

const dateElement = document.getElementById("date");
const weekdayElement = document.getElementById("weekday");
const greetingElement = document.getElementById("welcome-message");
const medikamenteContainer = document.getElementById("medikamente");
const nextButton = document.getElementById("next-day");
const prevButton = document.getElementById("prev-day");

let currentDate = new Date();

function updateDateDisplay() {

  console.log("UpdateDateDisplay");

  const weekday = weekdayNames[currentDate.getDay()];
  const dateStr = currentDate.toLocaleDateString("de-CH", {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  weekdayElement.textContent = `${weekday},`;
  dateElement.textContent = dateStr;

  const vorname = sessionStorage.getItem("vorname") || "Nutzer";
  greetingElement.textContent = `Guten Tag, ${vorname}`;

  loadMedikamente(); // <- Dynamisch die Medikamente abrufen
}

function formatTimeSlot(timeStr) {
  const hour = parseInt(timeStr.split(":")[0]);
  if (hour < 10) return "Morgen";
  if (hour < 17) return "Mittag";
  return "Abend";
}

function loadMedikamente() {

  console.log("Lade Medikamente für das Datum:", currentDate);

  const isoDate = currentDate.toISOString().split('T')[0];

  fetch(`api/medikamente_abrufen.php?datum=${isoDate}`)
    .then(res => res.json())
    .then(data => {
      medikamenteContainer.innerHTML = ""; // Alles löschen

      if (data.status === "success" && Array.isArray(data.data)) {
        const gruppiert = { Morgen: [], Mittag: [], Abend: [] };

        data.data.forEach(med => {
          const slot = formatTimeSlot(med.einnahmezeit);
          gruppiert[slot].push(med);
        });

        for (const [zeit, meds] of Object.entries(gruppiert)) {
          if (meds.length > 0) {
            const label = document.createElement("label");
            label.textContent = zeit;
            medikamenteContainer.appendChild(label);

            meds.forEach((med, index) => {
              const wrapper = document.createElement("div");
              wrapper.className = "checkbox-container";

              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.id = `med-${zeit}-${index}`;

              const medLink = document.createElement("a");
              medLink.href = `medikament_info.html?id=${med.id}`;
              medLink.style.color = "#7b68ee";
              medLink.style.textDecoration = "none";
              medLink.innerHTML = `<b>${med.name} </b>`;
              
              const medLabel = document.createElement("label");
              medLabel.setAttribute("for", checkbox.id);
              medLabel.appendChild(medLink);
              
              wrapper.appendChild(checkbox);
              wrapper.appendChild(medLabel);
              medikamenteContainer.appendChild(wrapper);
              
            });
          }
        }
      } else {
        medikamenteContainer.innerHTML = "<p>Keine Medikamente gefunden.</p>";
      }
    })
    .catch(err => {
      console.error("Fehler beim Abrufen der Medikamente:", err);
      medikamenteContainer.innerHTML = "<p>Fehler beim Laden der Medikamente.</p>";
    });
}

function nextDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateDisplay();
}

function previousDay() {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDateDisplay();
}

// Event Listener setzen
nextButton.addEventListener("click", nextDay);
prevButton.addEventListener("click", previousDay);

// Beim Laden ausführen
updateDateDisplay();
