console.log("protected.js loaded");

fetch("api/protected.php")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        if (data.status === "error") {
            window.location.href = "login.html";
        } else {
            // "Guten Tag <Vorname>" ausgeben
            document.getElementById("welcome-message").textContent = "Guten Tag " + data.vorname + "!";
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
