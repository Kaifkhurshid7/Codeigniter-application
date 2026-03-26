<?php

declare(strict_types=1);

namespace App\Filters;

use App\Controllers\BaseController;
use App\Controllers\Request;
use App\Helpers\JwtHelper;
use RuntimeException;

final class AuthFilter
{
    public function handle(): void
    {
        $request = new Request();
        $token = $request->bearerToken();

        if ($token === null) {
            BaseController::json(['message' => 'Authorization token is required.'], 401);
            exit;
        }

        try {
            $_SERVER['auth_user'] = JwtHelper::decode($token);
        } catch (RuntimeException $exception) {
            BaseController::json([
                'message' => 'Invalid or expired token.',
                'error' => $exception->getMessage(),
            ], 401);
            exit;
        }
    }
}
