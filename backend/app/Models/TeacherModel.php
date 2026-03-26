<?php

declare(strict_types=1);

namespace App\Models;

final class TeacherModel extends BaseModel
{
    public function create(array $data): int
    {
        $statement = $this->db->prepare(
            'INSERT INTO teachers (user_id, university_name, gender, year_joined)
             VALUES (:user_id, :university_name, :gender, :year_joined)'
        );
        $statement->execute($data);

        return (int) $this->db->lastInsertId();
    }

    public function existsForUser(int $userId): bool
    {
        $statement = $this->db->prepare('SELECT id FROM teachers WHERE user_id = :user_id LIMIT 1');
        $statement->execute(['user_id' => $userId]);

        return (bool) $statement->fetch();
    }

    public function all(): array
    {
        return $this->db->query(
            'SELECT teachers.id, teachers.user_id, auth_user.email, auth_user.first_name, auth_user.last_name,
                    teachers.university_name, teachers.gender, teachers.year_joined
             FROM teachers
             INNER JOIN auth_user ON auth_user.id = teachers.user_id
             ORDER BY teachers.id DESC'
        )->fetchAll();
    }
}
