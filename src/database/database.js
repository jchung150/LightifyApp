import * as SQLite from "expo-sqlite";

// Open or create the SQLite database
const db = SQLite.openDatabaseAsync("emotions.db");

// Initialize the database with a table
export async function initializeDatabase() {
  db = await SQLite.openDatabaseAsync("emotions.db");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS emotions (
      id INTEGER PRIMARY KEY NOT NULL,
      emotion TEXT NOT NULL,
      color INTEGER NOT NULL
    );
  `);

  console.log("Database initialized");
}

// Fetch all emotions
export async function fetchEmotions() {
  const rows = await db.getAllAsync("SELECT * FROM emotions");
  return rows; // Returns an array of objects
}

// Add a new emotion
export async function addEmotion(emotion, color) {
  const result = await db.runAsync(
    "INSERT INTO emotions (emotion, color) VALUES (?, ?)",
    emotion,
    color
  );
  console.log("Added emotion:", result.lastInsertRowId);
}

// Update an existing emotion
export async function updateEmotion(id, emotion, color) {
  const result = await db.runAsync(
    "UPDATE emotions SET emotion = ?, color = ? WHERE id = ?",
    emotion,
    color,
    id
  );
  console.log("Updated rows:", result.changes);
}

// Delete an emotion
export async function deleteEmotion(id) {
  const result = await db.runAsync("DELETE FROM emotions WHERE id = ?", id);
  console.log("Deleted rows:", result.changes);
}

export default db;