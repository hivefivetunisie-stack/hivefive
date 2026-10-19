<?php
/**
 * proxy.php — ERP HiveFive / Groupe OTELCO
 * https://hivefivecoworking.com/erp/proxy.php
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

define('GS_URL', 'https://script.google.com/macros/s/AKfycbwK477qexPCcUdMLIo-iFWmaevT7K7Ok3W8FU931zFQYXskU9DJfb3w1_wKRjlxpVdjsg/exec');

function curlGS($url, $method = 'GET', $body = null) {
    $ch = curl_init();
    $opts = [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 10,
        CURLOPT_TIMEOUT        => 60,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 ERP-HiveFive/3.0',
        CURLOPT_ENCODING       => '',
        CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,  // Forcer HTTP/1.1 (évite PROTOCOL_ERROR avec Google)
    ];
    if ($method === 'POST' && $body !== null) {
        $opts[CURLOPT_POST]       = true;
        $opts[CURLOPT_POSTFIELDS] = $body;
        $opts[CURLOPT_HTTPHEADER] = [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($body),
        ];
    }
    curl_setopt_array($ch, $opts);
    $response = curl_exec($ch);
    $code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    curl_close($ch);
    return [
        'response' => $response,
        'code'     => $code,
        'error'    => $error,
        'finalUrl' => $finalUrl
    ];
}

// ── GET : charger les données ──
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : 'load';
    $result = curlGS(GS_URL . '?action=' . urlencode($action));
    
    if ($result['error']) {
        echo json_encode([
            'status'   => 'err',
            'message'  => 'cURL error: ' . $result['error'],
            'finalUrl' => $result['finalUrl']
        ]);
        exit;
    }
    
    $gs = json_decode($result['response'], true);
    
    if (isset($gs['status'])) {
        echo json_encode($gs);
    } else {
        echo json_encode([
            'status'   => 'ok',
            'data'     => $gs,
            'httpCode' => $result['code']
        ]);
    }
    exit;
}

// ── POST : sauvegarder les données ──
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');

    if (empty($raw)) {
        echo json_encode(['status' => 'err', 'message' => 'Corps vide']);
        exit;
    }

    $envelope  = json_decode($raw, true);
    $gsPayload = isset($envelope['payload']) ? $envelope['payload'] : $raw;

    if (empty($gsPayload)) {
        echo json_encode(['status' => 'err', 'message' => 'Payload vide']);
        exit;
    }

    // Vérifier que le payload est du JSON valide
    $decoded = json_decode($gsPayload, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            'status'  => 'err',
            'message' => 'Payload JSON invalide: ' . json_last_error_msg(),
            'size'    => strlen($gsPayload)
        ]);
        exit;
    }
    
    $payloadSize = strlen($gsPayload);
    
    $result = curlGS(GS_URL, 'POST', $gsPayload);

    if ($result['error']) {
        echo json_encode([
            'status'  => 'err',
            'message' => 'cURL error: ' . $result['error'],
            'url'     => GS_URL
        ]);
        exit;
    }

    if ($result['code'] >= 200 && $result['code'] < 400) {
        $gs = json_decode($result['response'], true);
        if (isset($gs['status'])) {
            echo json_encode($gs);
        } else {
            echo json_encode([
                'status'   => 'ok',
                'httpCode' => $result['code'],
                'data'     => $gs ?: null,
                'raw'      => $gs ? null : substr($result['response'], 0, 500)
            ]);
        }
    } else {
        echo json_encode([
            'status'   => 'err',
            'httpCode' => $result['code'],
            'message'  => 'Google HTTP ' . $result['code'],
            'raw'      => substr($result['response'], 0, 500),
            'url'      => GS_URL
        ]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'err', 'message' => 'Méthode non supportée']);
