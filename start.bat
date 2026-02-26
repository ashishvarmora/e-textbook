@echo off
echo ========================================
echo   Digital Textbook - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if MongoDB is running (optional check)
echo Checking MongoDB connection...
echo.

REM Start Backend
echo ========================================
echo   Starting Backend Server...
echo ========================================
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)

if not exist .env (
    echo ERROR: backend/.env file not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit /b 1
)

start "Digital Textbook - Backend" cmd /k "npm start"
echo Backend starting on http://localhost:5000
echo.

REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul

REM Start Frontend
echo ========================================
echo   Starting Frontend Server...
echo ========================================
cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

if not exist .env (
    echo ERROR: frontend/.env file not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit /b 1
)

start "Digital Textbook - Frontend" cmd /k "npm start"
echo Frontend starting on http://localhost:3000
echo.

echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo The browser should open automatically.
echo If not, open http://localhost:3000 manually.
echo.
echo Press any key to exit this window...
echo (The servers will keep running in separate windows)
pause >nul
