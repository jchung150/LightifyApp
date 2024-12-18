import * as SQLite from "expo-sqlite";

let db = null;

export async function initializeDatabase() {
  if (db) {
    console.log("Database already initialized");
    return db;
  }

  try {
    db = await SQLite.openDatabaseAsync("emotions.db");
    console.log("Database connection established");

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS emotions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        emotion TEXT NOT NULL UNIQUE,
        color TEXT NOT NULL
      );
    `);

    console.log("Table created or already exists");
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export async function fetchEmotions() {
  try {
    if (!db) {
      console.log("Database is not initialized. Initializing now...");
      await initializeDatabase();
    }

    const rows = await db.getAllAsync("SELECT * FROM emotions");

    return rows;
  } catch (error) {
    console.error("Error fetching emotions:", error);
    throw error;
  }
}

export async function addEmotion(emotion, color) {
  try {
    const result = await db.runAsync(
      "INSERT INTO emotions (emotion, color) VALUES (?, ?)",
      [emotion, color]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding emotion:", error);
    throw error;
  }
}

export async function updateEmotion(id, emotion, color) {
  try {
    const result = await db.runAsync(
      "UPDATE emotions SET emotion = ?, color = ? WHERE id = ?",
      [emotion, color, id]
    );
    return result.changes;
  } catch (error) {
    console.error("Error updating emotion:", error);
    throw error;
  }
}

export async function deleteEmotion(id) {
  try {
    if (!db) {
      console.log("DB not initialized. Initializing...");
      await initializeDatabase();
    }

    const result = await db.runAsync("DELETE FROM emotions WHERE id = ?", [id]);

    if (result.changes > 0) {
      console.log("Deleted emotion with ID:", id);
    } else {
      console.log("No emotion found with ID:", id);
    }
  } catch (error) {
    console.error("Error deleting emotion:", error);
    throw error;
  }
}

export async function fetchEmotionById(id) {
  try {
    if (!db) {
      console.log("DB not initialized. Initializing...");
      await initializeDatabase();
    }

    const emotion = await db.getFirstAsync(
      "SELECT * FROM emotions WHERE id = ?",
      [id]
    );

    if (emotion) {
      return emotion;
    } else {
      throw new Error("No emotion found with the given ID");
    }
  } catch (error) {
    console.error("Error fetching emotion by ID:", error);
    throw error;
  }
}

export async function fetchEmotionByName(emotion) {
  try {
    if (!db) {
      console.log("DB not initialized. Initializing...");
      await initializeDatabase();
    }

    const emotionData = await db.getFirstAsync(
      "SELECT * FROM emotions WHERE emotion = ?",
      [emotion]
    );

    if (emotionData) {
      console.log("Fetched emotion by name:", emotionData);
      return emotionData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching emotion by name:", error);
    throw error;
  }
}

export default db;
