<?php

declare(strict_types=1);

namespace App\Config;

final class Environment
{
    private static array $values = [];

    public static function load(): void
    {
        $path = dirname(__DIR__, 2) . '/env';

        if (! is_file($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];

        foreach ($lines as $line) {
            $trimmed = trim($line);

            if ($trimmed === '' || str_starts_with($trimmed, '#')) {
                continue;
            }

            [$key, $value] = array_pad(explode('=', $trimmed, 2), 2, '');
            self::$values[trim($key)] = trim($value, " \t\n\r\0\x0B'\"");
        }
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        return self::$values[$key] ?? $default;
    }
}

Environment::load();
