# `src/application/task/sqlite-task-repository.ts`

## Purpose

This module implements the task repository contract using SQLite through Bun's `bun:sqlite` package.

## Responsibilities

- Read categories and tasks from SQLite.
- Map database rows into domain objects.
- Execute insert, update, and delete statements for tasks.

## What This Teaches

This file is an infrastructure adapter. It is a concrete example of how to keep SQL at the edge of the system while the rest of the app works with plain TypeScript objects.

## Key Concepts

- Row mapping is explicit and local to the adapter.
- `getSnapshot()` returns ready-to-use application data.
- The adapter is created through `createSqliteTaskRepository()`.

## Dependencies

- Depends on `getDatabase()` from the database module.
- Depends on the repository contract.
- Depends on the domain types for mapping.

## Design Notes

- SQL statements remain contained in one module.
- The adapter can be replaced without changing presentation code.
- The read model is intentionally simple because the UI currently needs all tasks and categories at once.
