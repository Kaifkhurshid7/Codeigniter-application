# Full-Stack Intern Assignment: CodeIgniter 4 + ReactJS

This project is a full-stack application built with a custom CodeIgniter 4 backend and a ReactJS (Vite) frontend. It features JWT authentication, transactional registration into multiple tables, and a modern, responsive user interface.

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
- **PHP**: ^8.1
- **Node.js**: ^18.x
- **MySQL** or **PostgreSQL**
- **Composer**: For PHP dependency management
- **npm**: For Node dependency management

## Setup Instructions

### 1. Database Setup
1. Create a MySQL database named `internship_assignment`.
2. Import the `backend/database.sql` file into your database.

### 2. Backend Configuration
1. Navigate to the `backend` directory.
2. Ensure you have an `env` file (one is provided by default).
3. Update the database credentials in the `env` file to match your local setup:
   ```env
   database.default.hostname = localhost
   database.default.database = internship_assignment
   database.default.username = root
   database.default.password = 
   ```

### 3. Install Dependencies
1. Run `composer install` in the `backend` directory (if you have composer installed).
2. Run `npm install` in the `frontend` directory.

### 4. Running the Application
To run both backend and frontend simultaneously, use the provided `run.bat` script (for Windows) or run the following commands in separate terminals:

**Backend**:
```bash
cd backend/public
php -S localhost:8080
```

**Frontend**:
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080`

## Author
kaif khurshid
# Codeigniter-application
