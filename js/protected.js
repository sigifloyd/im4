console.log("protected.js loaded");

fetch("api/protected.php")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        if (data.status === "error") {
            window.location.href = "login.html";
        } else {
            // Vorname zwischenspeichern für später
            sessionStorage.setItem("vorname", data.vorname);

            // Begrüßung sofort anzeigen
            document.getElementById("welcome-message").textContent = "Guten Tag, " + data.vorname + "!";
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
