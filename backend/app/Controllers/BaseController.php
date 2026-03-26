<?php

declare(strict_types=1);

namespace App\Controllers;

final class Request
{
    public function json(): array
    {
        $rawBody = file_get_contents('php://input') ?: '';
        return $rawBody !== '' ? (json_decode($rawBody, true) ?: []) : [];
    }

    public function bearerToken(): ?string
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? '';

        if (preg_match('/Bearer\s+(.+)/i', $header, $matches) === 1) {
            return trim($matches[1]);
        }

        return null;
    }
}

class BaseController
{
    protected Request $request;

    public function __construct()
    {
        $this->request = new Request();
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        echo json_encode($data, JSON_THROW_ON_ERROR);
    }
}
