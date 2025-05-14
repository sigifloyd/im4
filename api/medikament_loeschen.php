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

try {
    $stmt = $pdo->prepare("DELETE FROM medikament WHERE id = :id AND benutzer_id = :benutzer_id");
    $stmt->execute([
        ':id' => $id,
        ':benutzer_id' => $benutzer_id
    ]);

    echo "success";
} catch (PDOException $e) {
    echo "Fehler beim Löschen: " . $e->getMessage();
}
