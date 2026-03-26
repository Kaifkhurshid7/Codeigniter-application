<?php

declare(strict_types=1);

namespace App\Config;

use PDO;
use PDOException;

final class Database
{
    public static function connect(): PDO
    {
        $driver = Environment::get('database.default.DBDriver', 'MySQLi');
        $host = Environment::get('database.default.hostname', 'localhost');
        $database = Environment::get('database.default.database', 'internship_assignment');
        $port = Environment::get('database.default.port', '3306');
        $username = Environment::get('database.default.username', 'root');
        $password = Environment::get('database.default.password', '');

        $dsn = strtolower($driver) === 'postgresql'
            ? "pgsql:host={$host};port={$port};dbname={$database}"
            : "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";

        try {
            return new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $exception) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'message' => 'Database connection failed.',
                'error' => $exception->getMessage(),
            ], JSON_THROW_ON_ERROR);
            exit;
        }
    }
}
