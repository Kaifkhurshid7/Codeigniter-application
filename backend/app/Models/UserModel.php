<?php

declare(strict_types=1);

namespace App\Models;

final class UserModel extends BaseModel
{
    public function findByEmail(string $email): ?array
    {
        $statement = $this->db->prepare('SELECT * FROM auth_user WHERE email = :email LIMIT 1');
        $statement->execute(['email' => $email]);
        $user = $statement->fetch();

        return $user ?: null;
    }

    public function create(array $data): int
    {
        $statement = $this->db->prepare(
            'INSERT INTO auth_user (email, first_name, last_name, password, created_at)
             VALUES (:email, :first_name, :last_name, :password, :created_at)'
        );
        $statement->execute($data);

        return (int) $this->db->lastInsertId();
    }

    public function all(): array
    {
        return $this->db->query(
            'SELECT id, email, first_name, last_name, created_at FROM auth_user ORDER BY id DESC'
        )->fetchAll();
    }
}
