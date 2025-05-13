<?php

session_start(); // Session starten

header('Content-Type: application/json; charset=utf-8');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'status'   => 'success',
        'user_id'  => $_SESSION['user_id'],
        'email'    => $_SESSION['email'],
        'vorname'  => $_SESSION['vorname'] ?? 'Benutzer'
    ]);
} else {
    // Session ggf. aufräumen
    session_destroy();

    echo json_encode([
        'status' => 'error',
        'message' => 'User nicht eingeloggt.'
    ]);
}
