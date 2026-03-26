<?php

declare(strict_types=1);

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\TeacherModel;
use App\Models\UserModel;

final class TeacherController extends BaseController
{
    private TeacherModel $teachers;
    private UserModel $users;

    public function __construct()
    {
        parent::__construct();
        $this->teachers = new TeacherModel();
        $this->users = new UserModel();
    }

    public function create(): void
    {
        $payload = $this->request->json();
        $errors = $this->validatePayload($payload);

        if ($errors !== []) {
            self::json(['message' => 'Validation failed.', 'errors' => $errors], 400);
            return;
        }

        $user = $this->users->findByEmail(strtolower(trim($payload['email'])));

        if ($user === null) {
            $userId = $this->users->create([
                'email' => strtolower(trim($payload['email'])),
                'first_name' => trim($payload['first_name']),
                'last_name' => trim($payload['last_name']),
                'password' => password_hash($payload['password'], PASSWORD_BCRYPT),
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        } else {
            $userId = (int) $user['id'];

            if ($this->teachers->existsForUser($userId)) {
                self::json(['message' => 'Teacher profile already exists for this user.'], 400);
                return;
            }
        }

        $teacherId = $this->teachers->create([
            'user_id' => $userId,
            'university_name' => trim($payload['university_name']),
            'gender' => trim($payload['gender']),
            'year_joined' => (int) $payload['year_joined'],
        ]);

        self::json([
            'message' => 'Teacher profile created successfully.',
            'teacher_id' => $teacherId,
            'user_id' => $userId,
        ], 201);
    }

    private function validatePayload(array $payload): array
    {
        $requiredFields = [
            'email', 'first_name', 'last_name', 'password', 'university_name', 'gender', 'year_joined',
        ];
        $errors = [];

        foreach ($requiredFields as $field) {
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

        $year = (int) ($payload['year_joined'] ?? 0);
        $currentYear = (int) date('Y');

        if ($year < 1950 || $year > $currentYear) {
            $errors['year_joined'] = 'Year joined must be between 1950 and the current year.';
        }

        return $errors;
    }
}
