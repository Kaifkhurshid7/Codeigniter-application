CREATE DATABASE IF NOT EXISTS internship_assignment;
USE internship_assignment;

CREATE TABLE IF NOT EXISTS auth_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    university_name VARCHAR(180) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    year_joined INT NOT NULL,
    CONSTRAINT fk_teachers_user FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);
