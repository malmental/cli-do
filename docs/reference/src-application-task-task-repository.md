# `src/application/task/task-repository.ts`

## Purpose

This module defines the persistence contract for tasks. It is the boundary between application logic and storage implementation.

## Responsibilities

- Define the `TaskSnapshot` read model.
- Define the methods required to create, update, mutate status, and delete tasks.

## What This Teaches

This file is a repository port. It shows how to design against a capability rather than a technology. The rest of the application can depend on this interface without knowing whether the backing store is SQLite, memory, or something else.

## Key Concepts

- `getSnapshot()` returns the full state needed by the UI.
- Mutating methods are intention-revealing and narrow in scope.
- The interface excludes storage details.

## Dependencies

- Depends on the domain types only.

## Design Notes

- Keep the contract small enough to be implemented cleanly.
- If a caller needs a new capability, add it deliberately instead of leaking SQL outward.
