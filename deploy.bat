@echo off
cd "%~dp0"

echo ========================================
echo Source Rating - Deploy to GitHub+Vercel
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found.
    echo Install from https://nodejs.org then re-run.
    pause
    exit /b 1
)
echo [OK] Node.js found

echo.
echo [Step 1/4] npm install...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
)

echo.
echo [Step 2/4] Git init and commit...
if not exist ".git" (
    git init
    git config user.name "SourceRating"
    git config user.email "contact@sourcerating.com"
)
git add -A
git commit -m "Initial commit: Source Rating website"
git branch -M main

echo.
echo [Step 3/4] Push to GitHub...
set GITHUB_PAT=
git remote remove origin 2>nul
git remote add origin https://x-access-token:%GITHUB_PAT%@github.com/Jamescheng2022/sourcerating-website.git
git push -u origin main --force
if errorlevel 1 (
    echo.
    echo Push failed - creating repo first...
    curl -s -X POST https://api.github.com/user/repos -H "Authorization: token %GITHUB_PAT%" -H "Accept: application/vnd.github.v3+json" -d "{\"name\":\"sourcerating-website\",\"private\":false}" >nul 2>&1
    git push -u origin main --force
)

echo.
echo ========================================
echo [Step 4/4] Deploy on Vercel
echo ========================================
echo.
echo Code pushed to GitHub.
echo Now open: https://vercel.com/new
echo Import repo: Jamescheng2022/sourcerating-website
echo Vercel auto-detects Next.js - just click Deploy.
echo Then add domain: www.sourcerating.com
echo.
pause
