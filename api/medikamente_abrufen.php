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
        SELECT id, name, dosierung, einnahmezeit, packungsgroesse
        FROM medikament
        WHERE benutzer_id = :benutzer_id
          AND startdatum <= :datum
          AND (einnahmestop IS NULL OR einnahmestop >= :datum)
    ");
    $stmt->execute([
        ':benutzer_id' => $benutzer_id,
        ':datum' => $datum
    ]);

    $medikamente = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'data' => $medikamente]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
