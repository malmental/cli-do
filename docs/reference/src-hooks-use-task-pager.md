# `src/hooks/useTaskPager.ts`

## Purpose

This hook exposes the dashboard's fixed window of visible tasks.

## Responsibilities

- Wrap the pure selector used for pagination.
- Make the selector available in React-oriented code.

## What This Teaches

This file is a thin adapter layer. It is a good example of when a hook exists mainly to fit a selector into the component model without duplicating logic.

## Key Concepts

- The hook delegates almost everything to a pure function.
- The returned values describe layout, page state, and visible tasks.

## Dependencies

- Depends on `selectTaskWindow()`.
- Depends on the task domain type.

## Design Notes

- Keep it thin.
- If the calculation grows, move the complexity into the selector, not the hook.
