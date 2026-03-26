@echo off
setlocal

echo.
echo ========================================================
echo   Full-Stack Assignment: CodeIgniter 4 + ReactJS
echo ========================================================
echo.

:: Detect PHP
where php >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] PHP is not installed or not in your PATH.
    pause
    exit /b 1
)

:: Detect Node
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed or not in your PATH.
    pause
    exit /b 1
)

:: Run Backend in a separate window
echo Starting Backend (PHP) on http://localhost:8080...
start "Backend (PHP)" cmd /c "cd backend\public && php -S localhost:8080"

:: Run Frontend in a separate window
echo Starting Frontend (React) on http://localhost:5173...
start "Frontend (React)" cmd /c "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Both services are starting!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8080
echo ========================================================
echo.
echo Press any key to stop this script (it will not stop the services)...
pause
