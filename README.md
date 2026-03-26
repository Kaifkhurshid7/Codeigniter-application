# ARMS: Academic Resource Management System

This project is a high-integrity full-stack application built with a custom CodeIgniter 4 backend and a ReactJS (Vite) frontend. It features secure user provisioning, JWT-based authentication, and professional academic profile synchronization.

## Features
- **Backend**:
  - Custom-built mini-framework using CodeIgniter 4's structure.
  - JWT (JSON Web Token) based authentication.
  - One-to-one relationship between `auth_user` and `teachers`.
  - Transaction-safe registration API (`POST /api/register` or `POST /api/create-teacher`).
- **Frontend**:
  - ReactJS with Vite for fast performance.
  - Glassmorphism UI design with modern aesthetics.
  - Real-time form validation.
  - Protected Dashboard and Data Tables for User and Teacher management.

## Project Structure
```text
/backend          # Custom PHP Backend
  /app            # Application logic (Controllers, Models, Config)
  /public         # Entry point (index.php)
  /vendor         # PHP Dependencies (installed via Composer)
/frontend         # React App
  /src            # React source code
  /public         # Static assets
```

## Prerequisites
- **PHP**: `8.1` or later
- **Composer**: For PHP dependency management
- **Node.js**: `18.x` or later
- **npm**: Installed with Node.js
- **MySQL** or **PostgreSQL**

## How to Start the Project

### 1. Install and verify required tools

Make sure the following commands work in a new terminal:

```powershell
php -v
composer -V
node -v
npm -v
```

If `php` is not recognized on Windows:

1. Install PHP using XAMPP, Laragon, WAMP, or a standalone PHP build.
2. Add the folder containing `php.exe` to your system `Path`.
3. Reopen the terminal and run `php -v` again.

Common PHP locations on Windows:

- `C:\xampp\php`
- `C:\laragon\bin\php\php-8.x.x`
- `C:\wamp64\bin\php\php8.x.x`

### 2. Create the database

1. Create a database named `internship_assignment`.
2. Import `backend/database.sql` into that database.

### 3. Configure the backend

1. Go to the `backend` folder.
2. Make sure an `env` file exists.
3. Update the database credentials in the `env` file:

```env
database.default.hostname = localhost
database.default.database = internship_assignment
database.default.username = root
database.default.password =
```

### 4. Install project dependencies

Run these commands from the project root:

```powershell
cd backend
composer install
```

```powershell
cd ..\frontend
npm install
```

### 5. Start the application

From the project root, run:

```powershell
.\run.bat
```

This starts:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8080`

### 6. Manual start option

If `run.bat` does not work, start the backend and frontend in two separate terminals.

Backend:

```powershell
cd backend\public
php -S localhost:8080
```

Frontend:

```powershell
cd frontend
npm run dev
```

## Troubleshooting

- `PHP is not installed or not in your PATH`
  Install PHP and add its folder to the Windows `Path` environment variable.
- `composer is not recognized`
  Install Composer and reopen the terminal.
- `npm is not recognized`
  Install Node.js and reopen the terminal.
- Database connection error
  Check the `env` database credentials and confirm your database server is running.

## Author
kaif khurshid
# Codeigniter-application
