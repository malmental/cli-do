import { Database } from "bun:sqlite";
import { migrate } from "./schema";

let db: Database | null = null;

export function getDatabase(): Database {
  if (!db) {
    db = new Database("tasks.db");
    db.exec("PRAGMA journal_mode=WAL");
    migrate(db);
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}