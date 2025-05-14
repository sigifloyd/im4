<?php
require_once '../system/config.php';
session_start();
header('Content-Type: text/plain; charset=UTF-8');

$benutzer_id = $_SESSION['user_id'] ?? null;
$id = $_POST['id'] ?? null;

if (!$benutzer_id || !$id) {
    echo "Nicht berechtigt oder ID fehlt";
    exit;
}

// Eingaben aus dem Formular
$name = $_POST['name'] ?? '';
$form = $_POST['form'] ?? '';
$dosierung = $_POST['dosierung'] ?? '';
$frequenz = $_POST['frequenz'] ?? '';
$startdatum = $_POST['startdatum'] ?? '';
$einnahmezeit = $_POST['einnahmezeit'] ?? '';
$einnahmestop = $_POST['einnahmestop'] ?? '';
$hinweis = $_POST['hinweis'] ?? '';
$zweck = $_POST['zweck'] ?? '';
$packungsgroesse = $_POST['packungsgroesse'] ?? '';
$ablaufdatum = $_POST['ablaufdatum'] ?? '';
$wochentage = $_POST['wochentage'] ?? [];
$wochentageText = implode(',', $wochentage);

if (!$name || !$form || !$dosierung || !$frequenz || !$startdatum || !$einnahmezeit) {
    echo "Bitte fülle alle Pflichtfelder aus.";
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE medikament SET
            name = :name,
            form = :form,
            dosierung = :dosierung,
            frequenz = :frequenz,
            startdatum = :startdatum,
            einnahmezeit = :einnahmezeit,
            einnahmestop = :einnahmestop,
            hinweis = :hinweis,
            zweck = :zweck,
            packungsgroesse = :packungsgroesse,
            ablaufdatumPackung = :ablaufdatum,
            wochentage = :wochentage
        WHERE id = :id AND benutzer_id = :benutzer_id
    ");

    $stmt->execute([
        ':name' => $name,
        ':form' => $form,
        ':dosierung' => $dosierung,
        ':frequenz' => $frequenz,
        ':startdatum' => $startdatum,
        ':einnahmezeit' => $einnahmezeit,
        ':einnahmestop' => $einnahmestop,
        ':hinweis' => $hinweis,
        ':zweck' => $zweck,
        ':packungsgroesse' => $packungsgroesse,
        ':ablaufdatum' => $ablaufdatum,
        ':wochentage' => $wochentageText,
        ':id' => $id,
        ':benutzer_id' => $benutzer_id
    ]);

    echo "success";
} catch (PDOException $e) {
    echo "Fehler beim Aktualisieren: " . $e->getMessage();
}
