console.log("Hello from Register JS!");

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Formular‑Reload verhindern

  // ► Eingabewerte holen
  const vorname = document.querySelector("#vorname").value.trim();
  const nachname = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const geburt = document.querySelector("#geburt").value;
  const passwort = document.querySelector("#passwort").value;
  const passwort2 = document.querySelector("#passwort2").value;
  const datenschutz = document.querySelector("#datenschutz").checked;

  if (!vorname || !nachname || !email || !geburt || !passwort || !passwort2) {
    alert("Bitte fülle alle Felder aus.");
    return;
  }

  if (passwort.length < 8) {
    alert("Passwort muss mindestens 8 Zeichen lang sein");
    return;
  }

  if (passwort !== passwort2) {
    alert("Die Passwörter stimmen nicht überein.");
    return;
  }

  if (!datenschutz) {
    alert("Bitte akzeptiere die Datenschutzbestimmungen.");
    return;
  }

  // ► FormData vorbereiten
  const formData = new FormData();
  formData.append("vorname", vorname);
  formData.append("name", nachname);
  formData.append("email", email);
  formData.append("geburt", geburt);
  formData.append("passwort", passwort);
  formData.append("passwort2", passwort2);
  formData.append("datenschutz", datenschutz ? 1 : 0); // Checkbox in 1/0

  try {
    const res = await fetch("api/register.php", {
      method: "POST",
      body: formData,
    });

    let reply = await res.text();
    console.log("Antwort vom Server:\n" + reply);

    reply = reply.trim();

    if (reply === "success") {
      window.location.href = "login.html"; // Weiterleitung zur Login-Seite
    } else if (reply === "email_exists") {
      alert("Diese E-Mail-Adresse ist bereits registriert.");
    } else {
      alert(reply); // z. B. Validierungsfehler, Serverfehler usw.
    }
    

  } catch (err) {
    console.error("Fehler beim Senden:", err);
    alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
  }
});
