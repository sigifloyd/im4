<?php
require_once '../system/config.php';
session_start();

header('Content-Type: application/json');

$benutzer_id = $_SESSION['user_id'] ?? null;
$id = $_GET['id'] ?? null;

if (!$benutzer_id || !$id) {
    echo json_encode(['status' => 'error', 'message' => 'Keine Berechtigung']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM medikament WHERE id = :id AND benutzer_id = :benutzer_id");
    $stmt->execute([
        ':id' => $id,
        ':benutzer_id' => $benutzer_id
    ]);

    $med = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($med) {
        echo json_encode(['status' => 'success', 'med' => $med]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nicht gefunden']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
