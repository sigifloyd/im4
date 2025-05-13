console.log("Hello from login.js");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Formular‑Reload verhindern

    const email = document.querySelector("#email").value.trim();
    const passwort = document.querySelector("#passwort").value;

    console.log("email ist:", email);
    console.log("passwort ist:", passwort);

    if (!email || !passwort) {
        alert("Bitte fülle alle Felder aus");
        return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("passwort", passwort);

    try {
        const res = await fetch("api/login.php", {
            method: "POST",
            body: formData,
        });

        const rawReply = await res.text();
        const reply = rawReply.trim();
        console.log("Antwort vom Server:\n" + reply);

        if (reply === "success") {
            window.location.href = "index.html";
        } else {
            alert(reply);
        }

    } catch (err) {
        console.error("Fehler beim Senden:", err);
        alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
    }
});

