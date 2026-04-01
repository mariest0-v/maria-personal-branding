import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";
import Database from "better-sqlite3";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // Database setup
  const db = new Database("portfolio.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      category TEXT
    )
  `);

  // Seed initial data if empty
  const count = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
  if (count.count === 0) {
    const insert = db.prepare("INSERT INTO projects (title, description, image_url, category) VALUES (?, ?, ?, ?)");
    insert.run("School Group Project", "Python based game for school exam", "/uploads/satee.jpeg", "School");
    insert.run("Foodtopia Campaign", "Class posters for Fr.Artz Exhibition 2026", "/uploads/foodtopia.jpeg", "Campaign");
    insert.run("UI Design for Informatics", "School projects", "/uploads/ui design.jpeg", "UI Design");
  }

  // Cleanup: Remove specifically requested project if it exists from previous seeds
  db.prepare("DELETE FROM projects WHERE title = ?").run("Foodtopia Campaign Extra");

  // Update: Specifically requested image change for School Group Project row if it already exists
  db.prepare("UPDATE projects SET image_url = ? WHERE title = ?").run("/uploads/satee.jpeg", "School Group Project");
  db.prepare("UPDATE projects SET image_url = ? WHERE title = ?").run("/uploads/foodtopia.jpeg", "Foodtopia Campaign");

  // Update: Specifically requested image change for UI Design project
  // Using a more accurate fashion/dainty themed placeholder
  db.prepare("UPDATE projects SET image_url = ? WHERE title = ?").run("/uploads/ui design.jpeg", "UI Design for Informatics");

  // Multer setup for image uploads
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });

  // API Routes
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY id DESC").all();
    res.json(projects);
  });

  app.post("/api/projects", upload.single("image"), (req, res) => {
    const { title, description, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insert = db.prepare("INSERT INTO projects (title, description, image_url, category) VALUES (?, ?, ?, ?)");
    const result = insert.run(title, description, imageUrl, category || "General");
    res.json({ id: result.lastInsertRowid, title, description, image_url: imageUrl, category });
  });

  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
