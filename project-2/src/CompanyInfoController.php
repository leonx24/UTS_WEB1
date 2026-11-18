<?php

declare(strict_types=1);

class CompanyInfoController
{
    public function __construct(private readonly PDO $pdo)
    {
    }

    public function index(?string $category, ?string $search): void
    {
        $sql = 'SELECT * FROM company_info';
        $conditions = [];
        $params = [];

        if ($category !== null && trim($category) !== '') {
            $conditions[] = 'category = :category';
            $params[':category'] = trim($category);
        }

        if ($search !== null && trim($search) !== '') {
            $conditions[] = '(title LIKE :search_title OR summary LIKE :search_summary OR lead_division LIKE :search_division)';
            $term = '%' . trim($search) . '%';
            $params[':search_title'] = $term;
            $params[':search_summary'] = $term;
            $params[':search_division'] = $term;
        }

        if ($conditions !== []) {
            $sql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $sql .= ' ORDER BY code ASC';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $items = array_map(fn (array $row): array => $this->formatRow($row), $rows);

        sendJson(200, [
            'status' => 'success',
            'total' => count($items),
            'data' => $items,
        ]);
    }

    public function show(string $id): void
    {
        $row = $this->findRawById($id);
        if ($row === null) {
            sendJson(404, [
                'status' => 'error',
                'message' => "Informasi perusahaan dengan id '{$id}' tidak ditemukan.",
            ]);
        }

        sendJson(200, [
            'status' => 'success',
            'data' => $this->formatRow($row),
        ]);
    }

    public function store(array $input): void
    {
        $errors = $this->validatePayload($input, false);
        if ($errors !== []) {
            sendJson(422, [
                'status' => 'error',
                'message' => 'Validasi data gagal.',
                'errors' => $errors,
            ]);
        }

        $title = trim((string) $input['title']);
        $id = isset($input['id']) && trim((string) $input['id']) !== ''
            ? $this->slugify((string) $input['id'])
            : $this->slugify($title);

        if ($this->findRawById($id) !== null) {
            sendJson(409, [
                'status' => 'error',
                'message' => "Data dengan id '{$id}' sudah ada.",
            ]);
        }

        $code = isset($input['code']) && trim((string) $input['code']) !== ''
            ? strtoupper(trim((string) $input['code']))
            : $this->nextCode();

        if ($this->codeExists($code)) {
            sendJson(409, [
                'status' => 'error',
                'message' => "Kode informasi '{$code}' sudah digunakan.",
            ]);
        }

        $highlights = $this->normalizeStringArray($input['highlights'] ?? []);
        $details = $this->normalizeStringArray($input['details'] ?? []);
        $specs = $this->normalizeSpecs($input['specs'] ?? []);

        $stmt = $this->pdo->prepare(
            'INSERT INTO company_info (
                id, code, category, title, summary, image, image_alt,
                updated_at, read_time, lead_division, highlights, details, specs
            ) VALUES (
                :id, :code, :category, :title, :summary, :image, :image_alt,
                :updated_at, :read_time, :lead_division, :highlights, :details, :specs
            )'
        );

        $stmt->execute([
            ':id' => $id,
            ':code' => $code,
            ':category' => trim((string) $input['category']),
            ':title' => $title,
            ':summary' => trim((string) $input['summary']),
            ':image' => trim((string) ($input['image'] ?? '/images/studio-hero.jpg')),
            ':image_alt' => trim((string) ($input['imageAlt'] ?? $title)),
            ':updated_at' => trim((string) ($input['updatedAt'] ?? date('d M Y'))),
            ':read_time' => trim((string) ($input['readTime'] ?? '3 menit baca')),
            ':lead_division' => trim((string) $input['leadDivision']),
            ':highlights' => json_encode($highlights, JSON_UNESCAPED_UNICODE),
            ':details' => json_encode($details, JSON_UNESCAPED_UNICODE),
            ':specs' => json_encode($specs, JSON_UNESCAPED_UNICODE),
        ]);

        $created = $this->findRawById($id);

        sendJson(201, [
            'status' => 'success',
            'message' => 'Informasi perusahaan berhasil ditambahkan.',
            'data' => $created ? $this->formatRow($created) : null,
        ]);
    }

    public function update(string $id, array $input): void
    {
        $existing = $this->findRawById($id);
        if ($existing === null) {
            sendJson(404, [
                'status' => 'error',
                'message' => "Informasi perusahaan dengan id '{$id}' tidak ditemukan.",
            ]);
        }

        $errors = $this->validatePayload($input, true);
        if ($errors !== []) {
            sendJson(422, [
                'status' => 'error',
                'message' => 'Validasi data gagal.',
                'errors' => $errors,
            ]);
        }

        $current = $this->formatRow($existing);

        $code = isset($input['code']) ? strtoupper(trim((string) $input['code'])) : $current['code'];
        if ($code !== $current['code'] && $this->codeExists($code)) {
            sendJson(409, [
                'status' => 'error',
                'message' => "Kode informasi '{$code}' sudah digunakan.",
            ]);
        }

        $highlights = array_key_exists('highlights', $input)
            ? $this->normalizeStringArray($input['highlights'])
            : $current['highlights'];
        $details = array_key_exists('details', $input)
            ? $this->normalizeStringArray($input['details'])
            : $current['details'];
        $specs = array_key_exists('specs', $input)
            ? $this->normalizeSpecs($input['specs'])
            : $current['specs'];

        $stmt = $this->pdo->prepare(
            'UPDATE company_info SET
                code = :code,
                category = :category,
                title = :title,
                summary = :summary,
                image = :image,
                image_alt = :image_alt,
                updated_at = :updated_at,
                read_time = :read_time,
                lead_division = :lead_division,
                highlights = :highlights,
                details = :details,
                specs = :specs
            WHERE id = :id'
        );

        $stmt->execute([
            ':id' => $id,
            ':code' => $code,
            ':category' => trim((string) ($input['category'] ?? $current['category'])),
            ':title' => trim((string) ($input['title'] ?? $current['title'])),
            ':summary' => trim((string) ($input['summary'] ?? $current['summary'])),
            ':image' => trim((string) ($input['image'] ?? $current['image'])),
            ':image_alt' => trim((string) ($input['imageAlt'] ?? $current['imageAlt'])),
            ':updated_at' => trim((string) ($input['updatedAt'] ?? date('d M Y'))),
            ':read_time' => trim((string) ($input['readTime'] ?? $current['readTime'])),
            ':lead_division' => trim((string) ($input['leadDivision'] ?? $current['leadDivision'])),
            ':highlights' => json_encode($highlights, JSON_UNESCAPED_UNICODE),
            ':details' => json_encode($details, JSON_UNESCAPED_UNICODE),
            ':specs' => json_encode($specs, JSON_UNESCAPED_UNICODE),
        ]);

        $updated = $this->findRawById($id);

        sendJson(200, [
            'status' => 'success',
            'message' => 'Informasi perusahaan berhasil diperbarui.',
            'data' => $updated ? $this->formatRow($updated) : null,
        ]);
    }

    public function destroy(string $id): void
    {
        $existing = $this->findRawById($id);
        if ($existing === null) {
            sendJson(404, [
                'status' => 'error',
                'message' => "Informasi perusahaan dengan id '{$id}' tidak ditemukan.",
            ]);
        }

        $stmt = $this->pdo->prepare('DELETE FROM company_info WHERE id = :id');
        $stmt->execute([':id' => $id]);

        sendJson(200, [
            'status' => 'success',
            'message' => 'Informasi perusahaan berhasil dihapus.',
            'deletedId' => $id,
        ]);
    }

    private function findRawById(string $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_info WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();

        return $row === false ? null : $row;
    }

    private function codeExists(string $code): bool
    {
        $stmt = $this->pdo->prepare('SELECT 1 FROM company_info WHERE code = :code LIMIT 1');
        $stmt->execute([':code' => $code]);

        return $stmt->fetchColumn() !== false;
    }

    private function nextCode(): string
    {
        $stmt = $this->pdo->query("SELECT code FROM company_info WHERE code LIKE 'INF-%'");
        $codes = $stmt ? $stmt->fetchAll(PDO::FETCH_COLUMN) : [];
        $maxNum = 0;

        foreach ($codes as $code) {
            if (preg_match('/^INF-(\d+)$/', (string) $code, $matches) === 1) {
                $num = (int) $matches[1];
                if ($num > $maxNum) {
                    $maxNum = $num;
                }
            }
        }

        return sprintf('INF-%02d', $maxNum + 1);
    }

    private function validatePayload(array $input, bool $isPartial): array
    {
        $errors = [];
        $requiredFields = [
            'category' => 'Kategori wajib diisi.',
            'title' => 'Judul informasi wajib diisi.',
            'summary' => 'Ringkasan informasi wajib diisi.',
            'leadDivision' => 'Divisi penanggung jawab wajib diisi.',
        ];

        foreach ($requiredFields as $field => $message) {
            if (!$isPartial && (!isset($input[$field]) || trim((string) $input[$field]) === '')) {
                $errors[$field] = $message;
            } elseif ($isPartial && array_key_exists($field, $input) && trim((string) $input[$field]) === '') {
                $errors[$field] = $message;
            }
        }

        if ($isPartial && $input === []) {
            $errors['body'] = 'Minimal satu field harus dikirim untuk pembaruan.';
        }

        return $errors;
    }

    private function normalizeStringArray(mixed $value): array
    {
        if (!is_array($value)) {
            return [];
        }

        $items = [];
        foreach ($value as $entry) {
            $text = trim((string) $entry);
            if ($text !== '') {
                $items[] = $text;
            }
        }

        return $items;
    }

    private function normalizeSpecs(mixed $value): array
    {
        if (!is_array($value)) {
            return [];
        }

        $specs = [];
        foreach ($value as $item) {
            if (is_array($item) && isset($item['label'], $item['value'])) {
                $specs[] = [
                    'label' => trim((string) $item['label']),
                    'value' => trim((string) $item['value']),
                ];
            }
        }

        return $specs;
    }

    private function slugify(string $text): string
    {
        $slug = strtolower(trim($text));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
        $slug = trim($slug, '-');

        return $slug !== '' ? $slug : 'info-' . time();
    }

    private function formatRow(array $row): array
    {
        return [
            'id' => $row['id'],
            'code' => $row['code'],
            'category' => $row['category'],
            'title' => $row['title'],
            'summary' => $row['summary'],
            'image' => $row['image'],
            'imageAlt' => $row['image_alt'],
            'updatedAt' => $row['updated_at'],
            'readTime' => $row['read_time'],
            'leadDivision' => $row['lead_division'],
            'highlights' => json_decode((string) $row['highlights'], true) ?: [],
            'details' => json_decode((string) $row['details'], true) ?: [],
            'specs' => json_decode((string) $row['specs'], true) ?: [],
        ];
    }
}

