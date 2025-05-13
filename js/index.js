const weekdayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

const dateElement = document.getElementById("date");
const weekdayElement = document.getElementById("weekday");
const greetingElement = document.getElementById("welcome-message");
const nextButton = document.getElementById("next-day");
const prevButton = document.getElementById("prev-day");

let currentDate = new Date();

function updateDateDisplay() {
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
}

function nextDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateDisplay();
}

function previousDay() {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDateDisplay();
}

// Event-Listener
nextButton.addEventListener("click", nextDay);
prevButton.addEventListener("click", previousDay);

// Initial anzeigen
updateDateDisplay();
