import Database from "better-sqlite3";


const db = new Database("treinos.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS treinos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('A', 'B', 'C'))
  )
`);

export default db;
