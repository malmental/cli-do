# `src/db/schema.ts`

## Purpose

This module defines and applies the SQLite schema for the application.

## Responsibilities

- Create tables.
- Create indexes.
- Seed default categories.

## What This Teaches

This file shows how to treat schema creation as executable documentation. The database structure, constraints, and default rows are all visible in one place.

## Key Concepts

- `categories` and `tasks` form the core relational model.
- Constraints protect data integrity.
- `INSERT OR IGNORE` makes the seed idempotent.

## Dependencies

- Depends on `bun:sqlite` types.

## Design Notes

- Keep schema evolution deterministic.
- If a table definition changes, the migration layer should remain the first place to inspect.
