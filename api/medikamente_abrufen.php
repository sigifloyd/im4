<?php
require_once '../system/config.php';
session_start();

header('Content-Type: application/json; charset=UTF-8');

$benutzer_id = $_SESSION['user_id'] ?? null;
$datum = $_GET['datum'] ?? date('Y-m-d');

if (!$benutzer_id) {
    echo json_encode(['status' => 'error', 'message' => 'Nicht eingeloggt']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT id, name, dosierung, einnahmezeit, packungsgroesse,
               startdatum, einnahmestop, frequenz, wochentage
        FROM medikament
        WHERE benutzer_id = :benutzer_id
          AND startdatum <= :datum
          AND (einnahmestop IS NULL OR einnahmestop >= :datum)
    ");
    $stmt->execute([
        ':benutzer_id' => $benutzer_id,
        ':datum' => $datum
    ]);

    $alleMedikamente = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $heutigeMedikamente = [];

    $heute = new DateTime($datum);

    foreach ($alleMedikamente as $med) {
        $start = new DateTime($med['startdatum']);
        $tageDiff = $start->diff($heute)->days;
        $anzeigen = false;

        switch ($med['frequenz']) {
            case 'täglich':
                $anzeigen = true;
                break;
            case 'alle 2 Tage':
                $anzeigen = ($tageDiff % 2 === 0);
                break;
            case 'wöchentlich':
                $anzeigen = ($tageDiff % 7 === 0);
                break;
            case 'individuell':
                if (!empty($med['wochentage'])) {
                    $wochentage = explode(',', $med['wochentage']);
                    $wochentagHeute = $heute->format('l'); // z.B. "Monday"
                    $wochentagHeuteDeutsch = [
                        'Monday'    => 'Montag',
                        'Tuesday'   => 'Dienstag',
                        'Wednesday' => 'Mittwoch',
                        'Thursday'  => 'Donnerstag',
                        'Friday'    => 'Freitag',
                        'Saturday'  => 'Samstag',
                        'Sunday'    => 'Sonntag'
                    ][$wochentagHeute];

                    $anzeigen = in_array($wochentagHeuteDeutsch, $wochentage);
                }
                break;
        }

        if ($anzeigen) {
            $heutigeMedikamente[] = $med;
        }
    }

    echo json_encode(['status' => 'success', 'data' => $heutigeMedikamente]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
