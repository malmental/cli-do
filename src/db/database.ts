/**
 * @fileoverview Database Module - SQLite Connection Management
 * @module db/database
 *
 * @description
 * This module provides the database connection singleton for the CLI-Do
 * application. It uses Bun's built-in SQLite binding (`bun:sqlite`) to
 * provide fast, embedded database storage for tasks and categories.
 *
 * ## Singleton Pattern
 *
 * The module implements the singleton pattern to ensure only one database
 * connection exists throughout the application lifecycle. The `getDatabase()`
 * function returns the existing connection or creates a new one on first call.
 *
 * ## WAL Mode
 *
 * The database is configured with Write-Ahead Logging (WAL) mode via
 * `PRAGMA journal_mode=WAL`. This provides:
 * - Better concurrency for read operations
 * - Faster write operations
 * - Crash recovery capability
 *
 * ## File Location
 *
 * The database file (`tasks.db`) is created in the current working directory
 * where the application is executed. SQLite creates additional files:
 * - `tasks.db-shm`: Shared memory for WAL
 * - `tasks.db-wal`: Write-ahead log
 *
 * ## Migration
 *
 * On first connection, the `migrate()` function from schema.ts is called
 * to ensure all required tables and default data exist.
 *
 * ## Usage Example
 *
 * ```typescript
 * import { getDatabase } from './db/database';
 *
 * function getAllTasks() {
 *   const db = getDatabase();
 *   return db.query('SELECT * FROM tasks').all();
 * }
 * ```
 *
 * @requires bun:sqlite
 * @requires ./schema
 *
 * @see {@link https://bun.sh/docs/api/sqlite} for Bun SQLite documentation
 * @see {@link schema} for database schema and migration
 */

import { Database } from "bun:sqlite";
import { migrate } from "./schema";

/**
 * Database connection singleton.
 *
 * @private
 * @type {Database | null}
 */
let db: Database | null = null;

/**
 * Returns the database connection, creating it if necessary.
 *
 * This function implements a lazy initialization pattern. The database
 * connection is only created when first requested, not at module load time.
 * This prevents issues with database initialization order.
 *
 * @public
 * @function getDatabase
 * @returns {Database} The SQLite database connection
 *
 * @example
 * ```typescript
 * const db = getDatabase();
 * const tasks = db.query('SELECT * FROM tasks').all();
 * ```
 */
export function getDatabase(): Database {
  if (!db) {
    db = new Database("tasks.db");
    db.exec("PRAGMA journal_mode=WAL");
    migrate(db);
  }
  return db;
}

/**
 * Closes the database connection.
 *
 * This function should be called during application shutdown to ensure
 * all database resources are properly released. After calling this function,
 * the next call to `getDatabase()` will create a new connection.
 *
 * @public
 * @function closeDatabase
 * @returns {void}
 *
 * @example
 * ```typescript
 * // On application exit
 * closeDatabase();
 * ```
 */
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}