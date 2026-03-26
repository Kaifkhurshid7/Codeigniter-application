<?php

declare(strict_types=1);

namespace App\Config;

use App\Controllers\Api\AuthController;
use App\Controllers\Api\DataController;
use App\Controllers\Api\TeacherController;
use App\Filters\AuthFilter;

final class Routes
{
    private array $routes = [
        ['POST', '/register', [AuthController::class, 'register', null]],
        ['POST', '/login', [AuthController::class, 'login', null]],
        ['POST', '/create-teacher', [TeacherController::class, 'create', AuthFilter::class]],
        ['GET', '/users', [DataController::class, 'users', AuthFilter::class]],
        ['GET', '/teachers', [DataController::class, 'teachers', AuthFilter::class]],
    ];

    public function match(string $method, string $uri): ?array
    {
        foreach ($this->routes as [$allowedMethod, $path, $handler]) {
            if ($allowedMethod === strtoupper($method) && $path === $uri) {
                return $handler;
            }
        }

        return null;
    }
}
