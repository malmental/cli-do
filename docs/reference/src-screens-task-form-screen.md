# `src/screens/TaskFormScreen.tsx`

## Purpose

This screen renders the create/edit form for a task.

## Responsibilities

- Display the current title input.
- Show the available categories.
- Show the available statuses.
- Reflect the active screen mode.

## What This Teaches

This module is a terminal form example. It shows how form state can be driven directly from a reducer without introducing a separate form library.

## Key Concepts

- The form is keyboard-driven.
- Category and status selections are discrete stateful choices.
- The screen reads from context and does not own persistence.

## Dependencies

- Depends on the task context.
- Depends on shared status options and colors.

## Design Notes

- The form should remain close to the shape of the UI state.
- Simplicity matters more than abstraction here because the interaction surface is small.
