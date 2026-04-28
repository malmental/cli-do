# `src/types/Task.ts`

## Purpose

This module defines the task domain vocabulary for the entire application. It is the most stable file in the codebase because every other layer depends on its types.

## Responsibilities

- Declare the `Screen` union (`list`, `create`, `edit`, `detail`).
- Declare the `TaskStatus` union.
- Declare the `Task` and `Category` interfaces.
- Declare the form-facing `TaskInput` and `TaskUpdate` shapes.
- Provide helpers that derive readable duration information from a task record.

## What This Teaches

This file shows the role of a domain model in a small application. The model is not merely a TypeScript convenience. It is the shared contract between the UI, the reducer, the repository, and the database adapter.

## Key Concepts

- `Screen` defines the active terminal view for navigation.
- `TaskStatus` is the lifecycle axis of a task.
- `Task` represents a persisted record with identity and timestamps.
- `Category` groups tasks into user-facing buckets.
- `TaskInput` and `TaskUpdate` model boundaries around user actions.
- `getDaysTaken()` and `formatTaskDays()` are pure derived-value helpers.

## Dependencies

- No framework imports.
- No database imports.
- No UI imports.

## Design Notes

- Timestamps are Unix seconds so they align with SQLite defaults.
- The module keeps behavior close to the data it describes.
- The helpers are intentionally small and deterministic, which makes them safe to reuse anywhere.
