<?php
require_once '../system/config.php';
session_start();

header('Content-Type: text/plain; charset=UTF-8');

// Eingaben abfangen
$name                = $_POST['name']              ?? '';
$form                = $_POST['form']              ?? '';
$dosierung           = $_POST['dosierung']         ?? '';
$frequenz            = $_POST['frequenz']          ?? '';
$startdatum          = $_POST['startdatum']        ?? '';
$einnahmezeit        = $_POST['einnahmezeit']      ?? '';
$einnahmestop        = $_POST['einnahmestop']      ?? '';
$hinweis             = $_POST['hinweis']           ?? '';
$zweck               = $_POST['zweck']             ?? '';
$packungsgroesse     = $_POST['packungsgroesse']   ?? '';
$ablaufdatumPackung  = $_POST['ablaufdatum']       ?? '';
$wochentage          = $_POST['wochentage']        ?? [];
$wochentageText      = implode(',', $wochentage);
$benutzer_id         = $_SESSION['user_id']        ?? null;

// Validierung
if (!$name || !$form || !$dosierung || !$frequenz || !$startdatum || !$einnahmezeit || !$benutzer_id) {
    echo "Bitte alle Pflichtfelder ausfüllen.";
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO medikament (
            name, dosierung, form, frequenz,
            startdatum, einnahmezeit, einnahmestop,
            hinweis, zweck, packungsgroesse, ablaufdatumPackung,
            benutzer_id, wochentage
        ) VALUES (
            :name, :dosierung, :form, :frequenz,
            :startdatum, :einnahmezeit, :einnahmestop,
            :hinweis, :zweck, :packungsgroesse, :ablaufdatumPackung,
            :benutzer_id, :wochentage
        )
    ");

    $stmt->execute([
        ':name'               => $name,
        ':dosierung'          => $dosierung,
        ':form'               => $form,
        ':frequenz'           => $frequenz,
        ':startdatum'         => $startdatum,
        ':einnahmezeit'       => $einnahmezeit,
        ':einnahmestop'       => $einnahmestop,
        ':hinweis'            => $hinweis,
        ':zweck'              => $zweck,
        ':packungsgroesse'    => $packungsgroesse,
        ':ablaufdatumPackung' => $ablaufdatumPackung,
        ':benutzer_id'        => $benutzer_id,
        ':wochentage'         => $wochentageText
    ]);

    echo "success";
} catch (PDOException $e) {
    echo "Fehler beim Speichern: " . $e->getMessage();
}
