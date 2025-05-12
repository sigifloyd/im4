 
<?php
// Very simple debugging output.
// In Produktion → Passwort nicht im Klartext zurücksenden,
// sondern z.B. mit password_hash() abspeichern und gar nicht echo‑n!

require_once '../system/config.php'; // Datenbankverbindung
 
header('Content-Type: text/plain; charset=UTF-8');
 
// ► Daten aus $_POST abgreifen (kommen dort an, weil wir FormData benutzen)
$username = $_POST['username'] ?? '';
$email    = $_POST['email']    ?? '';
$password = $_POST['password'] ?? '';

 // Insert the new user
 $insert = $pdo->prepare("INSERT INTO benutzer (email, username, password) VALUES (:email, :user, :pass)");
    $insert->execute([
     ':email' => $email,
     ':pass'  => $password,
     ':user' => $username
 ]);


 
// ► Ausgeben – nur zum Test!
echo "PHP meldet, Daten erfolgreich empfangen";
// test
