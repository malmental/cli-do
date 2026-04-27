import type { Database } from "bun:sqlite";

export function migrate(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      created_at INTEGER DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'in_progress', 'completed')),
      category_id TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch()),
      completed_at INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category_id);
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  `);

  const defaultCategories = [
    { id: "personal", name: "Personal" },
    { id: "trabajo", name: "Trabajo" },
  ];

  const insertCategory = db.prepare(
    "INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)"
  );

  for (const cat of defaultCategories) {
    insertCategory.run(cat.id, cat.name);
  }
}