# Maria's Starry Portfolio - Local Setup Guide

This is a full-stack portfolio application built with **React (Vite)**, **Express**, and **SQLite**.

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/) (recommended)

### 2. Installation
Open your terminal in the project root and run:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (you can copy `.env.example`):
```bash
cp .env.example .env
```

### 4. Run the Application
Start the development server (both frontend and backend):
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🛠 Project Structure
- `server.ts`: The Express backend and SQLite database logic.
- `src/`: The React frontend source code.
- `public/uploads/`: Where your uploaded portfolio images are stored.
- `portfolio.db`: The SQLite database file (created automatically on first run).

## 🐞 Debugging in VS Code
1. Press `F5` or go to the **Run and Debug** tab.
2. Select **"Launch Server"**.
3. This will start the backend with the debugger attached.

## 📦 Building for Production
To create a production-ready build:
```bash
npm run build
npm start
```

Stitched with love. ✨
