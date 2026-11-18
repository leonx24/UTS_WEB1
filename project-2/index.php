<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonResponse(int $code, array $data): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function getBody(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        jsonResponse(400, ['status' => 'error', 'message' => 'Format JSON tidak valid.']);
    }
    return $decoded;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$baseDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($baseDir !== '' && $baseDir !== '/' && str_starts_with($path, $baseDir)) {
    $path = substr($path, strlen($baseDir));
}
$route = '/' . trim($path, '/');
$method = $_SERVER['REQUEST_METHOD'];

if ($route === '/' || $route === '/api/health') {
    jsonResponse(200, [
        'status' => 'ok',
        'message' => 'API RakitStudio (PHP Native) aktif.',
    ]);
}

try {
    require_once __DIR__ . '/config/database.php';
} catch (PDOException $e) {
    jsonResponse(500, [
        'status' => 'error',
        'message' => 'Gagal terhubung ke database MySQL/phpMyAdmin.',
        'detail' => $e->getMessage(),
    ]);
}

if ($route === '/api/info') {
    if ($method === 'GET') {
        $category = trim($_GET['category'] ?? '');
        if ($category !== '') {
            $stmt = $pdo->prepare('SELECT * FROM company_info WHERE category = ? ORDER BY id ASC');
            $stmt->execute([$category]);
        } else {
            $stmt = $pdo->query('SELECT * FROM company_info ORDER BY id ASC');
        }
        $rows = $stmt->fetchAll();
        jsonResponse(200, ['status' => 'success', 'total' => count($rows), 'data' => $rows]);
    }

    if ($method === 'POST') {
        $body = getBody();
        $code = trim($body['code'] ?? '');
        $category = trim($body['category'] ?? '');
        $title = trim($body['title'] ?? '');
        $summary = trim($body['summary'] ?? '');
        $leadDivision = trim($body['lead_division'] ?? '');
        $updatedAt = trim($body['updated_at'] ?? date('d M Y'));
        $readTime = trim($body['read_time'] ?? '3 menit baca');

        if ($code === '' || $category === '' || $title === '' || $summary === '' || $leadDivision === '') {
            jsonResponse(400, [
                'status' => 'error',
                'message' => 'Field code, category, title, summary, dan lead_division wajib diisi.',
            ]);
        }

        $stmt = $pdo->prepare(
            'INSERT INTO company_info (code, category, title, summary, lead_division, updated_at, read_time)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$code, $category, $title, $summary, $leadDivision, $updatedAt, $readTime]);

        $newId = (int) $pdo->lastInsertId();
        $created = $pdo->prepare('SELECT * FROM company_info WHERE id = ?');
        $created->execute([$newId]);

        jsonResponse(201, [
            'status' => 'success',
            'message' => 'Data informasi berhasil ditambahkan.',
            'data' => $created->fetch(),
        ]);
    }

    jsonResponse(405, ['status' => 'error', 'message' => 'Method tidak diizinkan.']);
}

if (preg_match('#^/api/info/(\d+)$#', $route, $matches)) {
    $id = (int) $matches[1];

    $check = $pdo->prepare('SELECT * FROM company_info WHERE id = ?');
    $check->execute([$id]);
    $existing = $check->fetch();

    if (!$existing) {
        jsonResponse(404, ['status' => 'error', 'message' => "Data dengan id $id tidak ditemukan."]);
    }

    if ($method === 'GET') {
        jsonResponse(200, ['status' => 'success', 'data' => $existing]);
    }

    if ($method === 'PUT') {
        $body = getBody();
        $code = trim($body['code'] ?? $existing['code']);
        $category = trim($body['category'] ?? $existing['category']);
        $title = trim($body['title'] ?? $existing['title']);
        $summary = trim($body['summary'] ?? $existing['summary']);
        $leadDivision = trim($body['lead_division'] ?? $existing['lead_division']);
        $updatedAt = trim($body['updated_at'] ?? date('d M Y'));
        $readTime = trim($body['read_time'] ?? $existing['read_time']);

        $stmt = $pdo->prepare(
            'UPDATE company_info
             SET code = ?, category = ?, title = ?, summary = ?, lead_division = ?, updated_at = ?, read_time = ?
             WHERE id = ?'
        );
        $stmt->execute([$code, $category, $title, $summary, $leadDivision, $updatedAt, $readTime, $id]);

        $updated = $pdo->prepare('SELECT * FROM company_info WHERE id = ?');
        $updated->execute([$id]);

        jsonResponse(200, [
            'status' => 'success',
            'message' => 'Data informasi berhasil diperbarui.',
            'data' => $updated->fetch(),
        ]);
    }

    if ($method === 'DELETE') {
        $stmt = $pdo->prepare('DELETE FROM company_info WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(200, [
            'status' => 'success',
            'message' => "Data dengan id $id berhasil dihapus.",
        ]);
    }

    jsonResponse(405, ['status' => 'error', 'message' => 'Method tidak diizinkan.']);
}

jsonResponse(404, ['status' => 'error', 'message' => 'Endpoint tidak ditemukan.']);
