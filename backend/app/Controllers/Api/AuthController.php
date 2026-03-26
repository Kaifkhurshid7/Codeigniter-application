<?php

declare(strict_types=1);

namespace App\Controllers\Api;

use App\Config\Environment;
use App\Controllers\BaseController;
use App\Helpers\JwtHelper;
use App\Models\UserModel;

final class AuthController extends BaseController
{
    private UserModel $users;

    public function __construct()
    {
        parent::__construct();
        $this->users = new UserModel();
    }

    public function register(): void
    {
        $payload = $this->request->json();
        $errors = $this->validateRegisterPayload($payload);

        if ($errors !== []) {
            self::json(['message' => 'Validation failed.', 'errors' => $errors], 400);
            return;
        }

        if ($this->users->findByEmail(strtolower(trim($payload['email']))) !== null) {
            self::json(['message' => 'Email already exists.'], 400);
            return;
        }

        $userId = $this->users->create([
            'email' => strtolower(trim($payload['email'])),
            'first_name' => trim($payload['first_name']),
            'last_name' => trim($payload['last_name']),
            'password' => password_hash($payload['password'], PASSWORD_BCRYPT),
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        self::json([
            'message' => 'User registered successfully.',
            'user_id' => $userId,
        ], 201);
    }

    public function login(): void
    {
        $payload = $this->request->json();
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $password = (string) ($payload['password'] ?? '');

        if ($email === '' || $password === '') {
            self::json(['message' => 'Email and password are required.'], 400);
            return;
        }

        $user = $this->users->findByEmail($email);

        if ($user === null || ! password_verify($password, $user['password'])) {
            self::json(['message' => 'Invalid credentials.'], 401);
            return;
        }

        $ttl = (int) Environment::get('jwt.ttl', '86400');
        $issuedAt = time();
        $token = JwtHelper::encode([
            'sub' => (int) $user['id'],
            'email' => $user['email'],
            'iat' => $issuedAt,
            'exp' => $issuedAt + $ttl,
        ]);

        self::json([
            'message' => 'Login successful.',
            'token' => $token,
            'user' => [
                'id' => (int) $user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
            ],
        ]);
    }

    private function validateRegisterPayload(array $payload): array
    {
        $errors = [];

        foreach (['email', 'first_name', 'last_name', 'password'] as $field) {
            if (trim((string) ($payload[$field] ?? '')) === '') {
                $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required.';
            }
        }

        if (($payload['email'] ?? '') !== '' && ! filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please provide a valid email address.';
        }

        if (strlen((string) ($payload['password'] ?? '')) < 6) {
            $errors['password'] = 'Password must be at least 6 characters long.';
        }

        return $errors;
    }
}
