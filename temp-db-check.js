const Database = require('better-sqlite3');
const db = new Database('portfolio.db');
const rows = db.prepare('SELECT id,title,image_url FROM projects ORDER BY id').all();
console.log(JSON.stringify(rows, null, 2));
