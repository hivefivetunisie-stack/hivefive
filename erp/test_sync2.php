<?php
// test_sync2.php - tester POST vers Google Apps Script
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$GS_URL = 'https://script.google.com/macros/s/AKfycbwK477qexPCcUdMLIo-iFWmaevT7K7Ok3W8FU931zFQYXskU9DJfb3w1_wKRjlxpVdjsg/exec';

// Mini payload de test (sans logos)
$testPayload = json_encode([
    'action' => 'sync',
    'data' => [
        'params' => ['hf' => ['nom' => 'TEST OTELCO', 'mf' => ''], 'sg' => ['nom' => 'TEST SG'], 'config' => []],
        'clients' => [['id' => 'C1', 'nom' => 'Test Client']],
        'emps' => [],
        'facs' => ['hf' => [], 'sg' => []],
        'achs' => ['hf' => [], 'sg' => []],
        'espaces' => [], 'abonnes' => [], 'contrats' => [],
        'plans' => [], 'stock' => [], 'menu' => [], 'ventes' => [],
        'travaux' => [], 'articles' => [], 'messages' => [],
        'ribs' => ['hf' => [], 'sg' => []], 'pts' => [],
        'timesheets' => [], 'absences' => [], 'primes' => [],
        'fournisseurs' => [], 'credits' => [], 'charges' => [],
        'equipements' => [], 'operations' => [], 'ress' => [],
        'depts' => [], 'mvts' => [],
    ]
]);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $GS_URL,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 10,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $testPayload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
    CURLOPT_USERAGENT      => 'Mozilla/5.0 ERP-Test',
]);
$response = curl_exec($ch);
$code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);
curl_close($ch);

echo json_encode([
    'test'         => 'POST mini payload → Google Apps Script',
    'payload_size' => strlen($testPayload) . ' bytes',
    'http_code'    => $code,
    'curl_error'   => $error ?: null,
    'response'     => $response ? substr($response, 0, 500) : null,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
