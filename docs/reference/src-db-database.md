# `src/db/database.ts`

## Purpose

This module manages the SQLite connection lifecycle.

## Responsibilities

- Lazily create a database connection.
- Enable WAL mode.
- Run migrations on first use.
- Expose a way to close the connection cleanly.

## What This Teaches

This file demonstrates the singleton connection pattern for a small CLI application. It keeps connection management centralized and predictable.

## Key Concepts

- Lazy initialization avoids opening the database too early.
- WAL mode improves concurrent read/write behavior.
- Migration is part of startup state management.

## Dependencies

- Depends on `bun:sqlite`.
- Depends on the schema migration function.

## Design Notes

- Keep connection logic here and nowhere else.
- Close the database during shutdown if the runtime lifecycle requires it.
