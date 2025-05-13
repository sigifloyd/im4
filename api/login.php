<?php
require_once('../system/config.php'); // Datenbankverbindung
session_start(); // Session starten

header('Content-Type: text/plain; charset=UTF-8');

// ► Eingabedaten prüfen
$email    = $_POST['email']    ?? '';
$passwort = $_POST['passwort'] ?? '';

if (empty($email) || empty($passwort)) {
    echo "Bitte fülle alle Felder aus.";
    exit;
}

// ► Benutzer anhand der E-Mail suchen
$stmt = $pdo->prepare("SELECT * FROM benutzer WHERE email = :email");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch();

if ($user) {
    // ► Passwort prüfen
    if (password_verify($passwort, $user['password'])) {
        // ► Session setzen
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['email']   = $user['email'];
        $_SESSION['vorname'] = $user['vorname']; // optional für Begrüßung später

        echo "success";
    } else {
        echo "Passwort falsch.";
    }
} else {
    echo "E-Mail nicht korrekt.";
}

