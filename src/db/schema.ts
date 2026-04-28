/**
 * @fileoverview Database Schema - Table Definitions and Migrations
 * @module db/schema
 *
 * @description
 * This module defines the database schema for the CLI-Do application.
 * It creates the necessary tables and indexes for storing tasks and
 * categories, and seeds the database with default categories.
 *
 * ## Schema Design
 *
 * The schema implements a normalized relational design:
 *
 * ### Categories Table
 * Stores task categories with unique name constraint.
 * - `id`: Primary key (e.g., "personal", "trabajo")
 * - `name`: Human-readable category name (unique)
 * - `created_at`: Unix timestamp of creation
 *
 * ### Tasks Table
 * Stores individual tasks with foreign key to categories.
 * - `id`: UUID primary key
 * - `title`: Task description
 * - `status`: Enum (pending, in_progress, completed)
 * - `category_id`: Foreign key to categories
 * - `created_at`: Unix timestamp of creation
 * - `completed_at`: Unix timestamp when marked complete (nullable)
 *
 * ## Indexes
 *
 * Two indexes are created for query performance:
 * - `idx_tasks_category`: For filtering tasks by category
 * - `idx_tasks_status`: For filtering tasks by status
 *
 * ## Default Data
 *
 * The migration seeds two default categories:
 * - `personal`: Personal tasks
 * - `trabajo`: Work-related tasks
 *
 * The `INSERT OR IGNORE` pattern ensures these categories only exist
 * if they haven't been previously created (idempotent migration).
 *
 * ## Constraints
 *
 * - Tasks have a CHECK constraint on status values
 * - Foreign key enforces referential integrity between tasks and categories
 *
 * ## Usage
 *
 * This module is called internally by `getDatabase()` in database.ts.
 * Applications should not call `migrate()` directly.
 *
 * @requires bun:sqlite
 *
 * @see {@link database} for connection management
 */

import type { Database } from "bun:sqlite";

/**
 * Executes database migrations and seeds default data.
 *
 * This function creates all required tables and indexes if they don't
 * exist (using CREATE TABLE IF NOT EXISTS). It also seeds the default
 * categories that ship with the application.
 *
 * @function migrate
 * @param {Database} db - The database connection to migrate
 * @returns {void}
 *
 * @example
 * ```typescript
 * const db = new Database('tasks.db');
 * migrate(db);
 * ```
 */
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
    { id: "work", name: "Work" },
  ];

  const insertCategory = db.prepare(
    "INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)"
  );

  for (const cat of defaultCategories) {
    insertCategory.run(cat.id, cat.name);
  }
}