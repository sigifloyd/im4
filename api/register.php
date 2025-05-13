<?php
require_once '../system/config.php'; // Datenbankverbindung

header('Content-Type: text/plain; charset=UTF-8');

// ► Daten aus $_POST abgreifen
$vorname     = $_POST['vorname']     ?? '';
$nachname    = $_POST['name']        ?? ''; // HTML-Feld heißt "name", DB-Feld "nachname"
$email       = $_POST['email']       ?? '';
$geburt      = $_POST['geburt']      ?? '';
$passwort    = $_POST['passwort']    ?? '';
$passwort2   = $_POST['passwort2']   ?? '';
$datenschutz = $_POST['datenschutz'] ?? 0;

// ► Validierungen
if (!$email || !$passwort || !$passwort2 || !$vorname || !$nachname || !$geburt) {
    echo "Bitte fülle alle Felder aus.";
    exit;
}

if (strlen($passwort) < 8) {
    echo "Passwort muss mindestens 8 Zeichen lang sein.";
    exit;
}

if ($passwort !== $passwort2) {
    echo "Die Passwörter stimmen nicht überein.";
    exit;
}

if (!$datenschutz) {
    echo "Bitte akzeptiere die Datenschutzbestimmungen.";
    exit;
}

// ► Prüfen, ob die E-Mail bereits existiert
$check = $pdo->prepare("SELECT * FROM benutzer WHERE email = :email");
$check->execute([':email' => $email]);

if ($check->fetch()) {
    echo "email_exists";
    exit;
}

// ► Passwort hashen
$hashedPassword = password_hash($passwort, PASSWORD_DEFAULT);

// ► Benutzer speichern
try {
    $insert = $pdo->prepare("
        INSERT INTO benutzer (vorname, nachname, email, geburtsdatum, password)
        VALUES (:vorname, :nachname, :email, :geburt, :passwort)
    ");

    $insert->execute([
        ':vorname'   => $vorname,
        ':nachname'  => $nachname,
        ':email'     => $email,
        ':geburt'    => $geburt,
        ':passwort'  => $hashedPassword
    ]);

    echo "success"; // JS leitet weiter
} catch (PDOException $e) {
    echo "Fehler beim Speichern: " . $e->getMessage();
}
