# `src/application/task/task-selectors.ts`

## Purpose

This module contains pure selectors for derived task state.

## Responsibilities

- Select the current task from the selected index.
- Compute the task window used by the paged dashboard.

## What This Teaches

Selectors are a clean way to separate derived data from rendering. They let the UI ask for a view of the data instead of reimplementing calculations inline.

## Key Concepts

- `selectSelectedTask()` is the simplest possible selector.
- `selectTaskWindow()` handles pagination math and viewport sizing.
- Pure selectors are easy to test because they have no side effects.

## Dependencies

- Depends only on domain types.

## Design Notes

- Keep selectors deterministic.
- Prefer selectors when multiple screens need the same derived result.
